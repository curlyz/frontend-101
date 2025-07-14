"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { throttle, debounce } from "lodash";

export interface EventHandlerConfig {
  throttleWait?: number;
  debounceWait?: number;
  enableLogging?: boolean;
}

export interface EventMetrics {
  directCallCount: number;
  throttledCallCount: number;
  debouncedCallCount: number;
  lastDirectValue: string;
  lastThrottledValue: string;
  lastDebouncedValue: string;
  totalEvents: number;
  startTime: Date;
}

interface PerformanceMonitoringContextType {
  // Current metrics
  metrics: EventMetrics;

  // Input value
  inputValue: string;
  setInputValue: (value: string) => void;

  // Event handlers
  handleDirectApiCall: (value: string) => void;
  handleThrottledApiCall: (value: string) => void;
  handleDebouncedApiCall: (value: string) => void;

  // Convenience method for input changes
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Metrics controls
  resetMetrics: () => void;
  getPerformanceStats: () => {
    directCallsPerSecond: number;
    throttledCallsPerSecond: number;
    debouncedCallsPerSecond: number;
    totalDuration: number;
    efficiency: {
      throttledReduction: number;
      debouncedReduction: number;
    };
  };

  // Configuration
  config: EventHandlerConfig;
  updateConfig: (newConfig: Partial<EventHandlerConfig>) => void;
}

const PerformanceMonitoringContext = createContext<
  PerformanceMonitoringContextType | undefined
>(undefined);

export const usePerformanceMonitoring = () => {
  const context = useContext(PerformanceMonitoringContext);
  if (context === undefined) {
    throw new Error(
      "usePerformanceMonitoring must be used within a PerformanceMonitoringProvider",
    );
  }
  return context;
};

interface PerformanceMonitoringProviderProps {
  children: React.ReactNode;
  initialConfig?: EventHandlerConfig;
}

export const PerformanceMonitoringProvider: React.FC<
  PerformanceMonitoringProviderProps
> = ({ children, initialConfig = {} }) => {
  const [config, setConfig] = useState<EventHandlerConfig>({
    throttleWait: 500,
    debounceWait: 500,
    enableLogging: true,
    ...initialConfig,
  });

  const [inputValue, setInputValue] = useState("");
  const [metrics, setMetrics] = useState<EventMetrics>({
    directCallCount: 0,
    throttledCallCount: 0,
    debouncedCallCount: 0,
    lastDirectValue: "",
    lastThrottledValue: "",
    lastDebouncedValue: "",
    totalEvents: 0,
    startTime: new Date(),
  });

  const log = useCallback(
    (category: string, value: string) => {
      if (config.enableLogging) {
        console.log(`[${category}] API Call with:`, value);
      }
    },
    [config.enableLogging],
  );

  const handleDirectApiCall = useCallback(
    (value: string) => {
      log("DIRECT", value);
      setMetrics((prev) => ({
        ...prev,
        directCallCount: prev.directCallCount + 1,
        lastDirectValue: value,
        totalEvents: prev.totalEvents + 1,
      }));
    },
    [log],
  );

  // Create throttled function with current config
  const createThrottledHandler = useCallback(() => {
    return throttle(
      (value: string) => {
        log("THROTTLED", value);
        setMetrics((prev) => ({
          ...prev,
          throttledCallCount: prev.throttledCallCount + 1,
          lastThrottledValue: value,
        }));
      },
      config.throttleWait,
      { leading: true, trailing: true },
    );
  }, [config.throttleWait, log]);

  // Create debounced function with current config
  const createDebouncedHandler = useCallback(() => {
    return debounce((value: string) => {
      log("DEBOUNCED", value);
      setMetrics((prev) => ({
        ...prev,
        debouncedCallCount: prev.debouncedCallCount + 1,
        lastDebouncedValue: value,
      }));
    }, config.debounceWait);
  }, [config.debounceWait, log]);

  // Stable throttled and debounced handlers
  const [throttledHandler] = useState(createThrottledHandler);
  const [debouncedHandler] = useState(createDebouncedHandler);

  // Update handlers when config changes
  useEffect(() => {
    // Cancel any pending calls
    throttledHandler.cancel();
    debouncedHandler.cancel();

    // Note: In a production app, you might want to recreate handlers
    // when config changes, but for demo purposes, keeping them stable
  }, [config, throttledHandler, debouncedHandler]);

  const handleThrottledApiCall = useCallback(
    (value: string) => {
      throttledHandler(value);
    },
    [throttledHandler],
  );

  const handleDebouncedApiCall = useCallback(
    (value: string) => {
      debouncedHandler(value);
    },
    [debouncedHandler],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
      handleDirectApiCall(value);
      handleThrottledApiCall(value);
      handleDebouncedApiCall(value);
    },
    [handleDirectApiCall, handleThrottledApiCall, handleDebouncedApiCall],
  );

  const resetMetrics = useCallback(() => {
    setMetrics({
      directCallCount: 0,
      throttledCallCount: 0,
      debouncedCallCount: 0,
      lastDirectValue: "",
      lastThrottledValue: "",
      lastDebouncedValue: "",
      totalEvents: 0,
      startTime: new Date(),
    });
    setInputValue("");

    // Cancel any pending calls
    throttledHandler.cancel();
    debouncedHandler.cancel();
  }, [throttledHandler, debouncedHandler]);

  const getPerformanceStats = useCallback(() => {
    const now = new Date();
    const totalDuration = (now.getTime() - metrics.startTime.getTime()) / 1000; // seconds

    const directCallsPerSecond =
      totalDuration > 0 ? metrics.directCallCount / totalDuration : 0;
    const throttledCallsPerSecond =
      totalDuration > 0 ? metrics.throttledCallCount / totalDuration : 0;
    const debouncedCallsPerSecond =
      totalDuration > 0 ? metrics.debouncedCallCount / totalDuration : 0;

    const throttledReduction =
      metrics.directCallCount > 0
        ? ((metrics.directCallCount - metrics.throttledCallCount) /
            metrics.directCallCount) *
          100
        : 0;

    const debouncedReduction =
      metrics.directCallCount > 0
        ? ((metrics.directCallCount - metrics.debouncedCallCount) /
            metrics.directCallCount) *
          100
        : 0;

    return {
      directCallsPerSecond,
      throttledCallsPerSecond,
      debouncedCallsPerSecond,
      totalDuration,
      efficiency: {
        throttledReduction,
        debouncedReduction,
      },
    };
  }, [metrics]);

  const updateConfig = useCallback((newConfig: Partial<EventHandlerConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const value: PerformanceMonitoringContextType = {
    // Current metrics
    metrics,

    // Input value
    inputValue,
    setInputValue,

    // Event handlers
    handleDirectApiCall,
    handleThrottledApiCall,
    handleDebouncedApiCall,

    // Convenience method for input changes
    handleInputChange,

    // Metrics controls
    resetMetrics,
    getPerformanceStats,

    // Configuration
    config,
    updateConfig,
  };

  return (
    <PerformanceMonitoringContext.Provider value={value}>
      {children}
    </PerformanceMonitoringContext.Provider>
  );
};
