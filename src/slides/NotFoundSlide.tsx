import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

/**
 * Renders a 404 Not Found page.
 *
 * @returns {JSX.Element} The NotFoundSlide component.
 */
const NotFoundSlide: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default NotFoundSlide;
