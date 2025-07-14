# Hands-on: Building with AI APIs

## Main Ideas to Convey

- Show practical implementation of AI APIs in web applications
- Demonstrate error handling and best practices for AI integrations
- Provide real-world examples of AI-powered features

## Visual Ideas

- **API Integration Flow:**
  - Frontend → API request → AI service → Response → UI update
  - Error handling paths and fallback mechanisms
- **Live Demo Interface:**
  - Chat interface with AI responses
  - Code generation tool
  - Real-time API calls and responses
- **Cost and Rate Limiting:**
  - Token usage meters, API quotas, optimization strategies

## Content

**AI API Overview**
Popular AI APIs for developers:
- **OpenAI API**: GPT-4, GPT-3.5, DALL-E, Whisper
- **Anthropic API**: Claude models for text generation
- **Google AI**: Gemini API for multimodal applications
- **Cohere**: Language models with focus on enterprise use
- **Hugging Face**: Open-source models and inference API

**Basic API Integration**
Key concepts for AI API integration:
- **Authentication**: API keys, tokens, and security best practices
- **Request Structure**: Proper formatting of prompts and parameters
- **Response Handling**: Processing AI-generated content
- **Error Management**: Handling API failures and rate limits

**Example: Chat Interface with OpenAI API**
```typescript
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const sendMessage = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};
```

**Rate Limiting and Cost Management**
Important considerations:
- **Token Limits**: Understanding input/output token constraints
- **Rate Limiting**: Implementing proper request throttling
- **Cost Optimization**: Strategies to minimize API usage costs
- **Caching**: Storing responses to reduce redundant API calls

**Error Handling Best Practices**
Common error scenarios:
- **Rate Limit Exceeded**: Implement exponential backoff
- **Invalid Requests**: Validate inputs before sending
- **Network Failures**: Provide fallback responses
- **Token Limits**: Handle responses that exceed limits

**Security Considerations**
- **API Key Management**: Store keys securely, use environment variables
- **Input Validation**: Sanitize user inputs before sending to AI
- **Output Filtering**: Check AI responses for inappropriate content
- **Data Privacy**: Be mindful of sensitive information in prompts

**Real-World Implementation Examples**

**1. Code Generation Assistant**
```typescript
const generateCode = async (description: string, language: string) => {
  const prompt = `Generate ${language} code for: ${description}
  
Requirements:
- Include proper error handling
- Add comments explaining the logic
- Follow best practices for ${language}`;

  return await callAI(prompt);
};
```

**2. Content Summarization**
```typescript
const summarizeContent = async (content: string, maxLength: number) => {
  const prompt = `Summarize the following content in ${maxLength} words or less:
  
${content}`;

  return await callAI(prompt);
};
```

**3. Code Review Assistant**
```typescript
const reviewCode = async (code: string) => {
  const prompt = `Review this code for:
- Potential bugs
- Security issues
- Performance improvements
- Best practices

Code:
${code}`;

  return await callAI(prompt);
};
```

**Performance Optimization**
- **Streaming Responses**: Handle real-time AI output
- **Parallel Processing**: Send multiple requests concurrently
- **Request Batching**: Combine multiple queries when possible
- **Response Caching**: Store frequently requested results

**Monitoring and Analytics**
Track important metrics:
- **API Usage**: Monitor token consumption and costs
- **Response Times**: Measure API latency
- **Error Rates**: Track failed requests and reasons
- **User Satisfaction**: Measure quality of AI responses

**Testing AI Integrations**
- **Unit Tests**: Test API calling functions
- **Integration Tests**: Test full AI workflows
- **Mock Testing**: Use mocked AI responses for reliable testing
- **Load Testing**: Ensure system handles high AI API usage

**Deployment Considerations**
- **Environment Variables**: Secure API key management
- **Monitoring**: Set up alerts for API failures
- **Scaling**: Handle increased AI API usage
- **Fallbacks**: Provide alternatives when AI is unavailable

**Best Practices Summary**
1. **Always validate inputs** before sending to AI APIs
2. **Implement proper error handling** with user-friendly messages
3. **Monitor costs and usage** to avoid unexpected charges
4. **Use caching** to reduce redundant API calls
5. **Provide loading states** for better user experience
6. **Test thoroughly** with various inputs and edge cases
7. **Keep security in mind** when handling AI responses

## Presentation Status: To Be Prepared