export const mockProjectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, checkout process, and payment integration.",
    longDescription:
      "This e-commerce platform was developed to provide a complete online shopping experience. It includes features like product browsing, filtering, user accounts, shopping carts, secure checkout, and payment processing. The frontend was built with React for a responsive and interactive UI, while the backend uses Node.js with Express to handle API requests and MongoDB to store data. Stripe API was integrated for payment processing.",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "full-stack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    features: [
      "User authentication and profiles",
      "Product catalog with search and filtering",
      "Shopping cart and wishlist functionality",
      "Secure checkout process",
      "Payment processing with Stripe",
      "Order tracking and history",
      "Admin dashboard for product management",
    ],
    challenges:
      "One of the main challenges was implementing a secure and seamless checkout process while integrating with payment gateways. I had to ensure data security while providing a smooth user experience.",
    solution:
      "I implemented a multi-step checkout process with appropriate validation at each step and used Stripe's secure elements to handle payment information. This allowed for a seamless user experience while maintaining security standards.",
    liveUrl: "https://example.com/ecommerce",
    codeUrl: "https://github.com/username/ecommerce-project",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
    longDescription:
      "This task management application was designed to help teams manage projects efficiently using a Kanban board approach. Users can create tasks, assign them to team members, set deadlines, add comments, and track progress through customizable boards. The application features a drag-and-drop interface for easy task management and real-time updates to enhance team collaboration.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    category: "frontend",
    technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"],
    features: [
      "Kanban board with customizable columns",
      "Drag-and-drop task management",
      "Task prioritization and filtering",
      "Team collaboration tools",
      "Deadline tracking and notifications",
      "Task attachments and comments",
      "Performance analytics dashboard",
    ],
    challenges:
      "Creating a smooth drag-and-drop experience while maintaining state consistency across multiple users was challenging. I also needed to optimize performance for boards with a large number of tasks.",
    solution:
      "I implemented a custom drag-and-drop system using React DnD and optimized state management with Redux to ensure consistent updates. For performance, I implemented virtualization for large task lists.",
    liveUrl: "https://example.com/taskmanager",
    codeUrl: "https://github.com/username/task-manager",
    featured: true,
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description:
      "A messaging platform with real-time chat capabilities, user authentication, and message history.",
    longDescription:
      "This real-time chat application enables users to communicate instantly through text messages, share media, and maintain conversation history. It features user authentication, contact lists, real-time notifications, and end-to-end message encryption for privacy. The frontend was built with React for a responsive interface, while Firebase provided backend services, authentication, and real-time database functionality.",
    image:
      "https://images.unsplash.com/photo-1521790361543-f645cf042ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    category: "full-stack",
    technologies: ["React", "Firebase", "Socket.io", "Material UI"],
    features: [
      "Real-time messaging with typing indicators",
      "User presence status (online/offline)",
      "Media sharing capabilities",
      "Message read receipts",
      "End-to-end encryption",
      "Push notifications",
      "Message search and history",
    ],
    challenges:
      "Ensuring reliable real-time communication across different network conditions while maintaining message delivery guarantees was challenging. I also needed to implement proper encryption for message privacy.",
    solution:
      "I used Socket.io for reliable WebSocket connections with fallback options and implemented a message queue system to handle offline messages. For security, I implemented end-to-end encryption using the Web Crypto API.",
    liveUrl: "https://example.com/chat",
    codeUrl: "https://github.com/username/chat-app",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A weather information dashboard with location search, forecast data, and interactive maps.",
    longDescription:
      "This weather dashboard provides users with current weather conditions and forecasts for any location worldwide. It features a search function for locations, detailed weather information including temperature, humidity, wind speed, and precipitation, and a 7-day forecast. The application uses the OpenWeather API for data and displays it through interactive charts and maps, offering users a comprehensive view of weather conditions.",
    image:
      "https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    category: "frontend",
    technologies: ["React", "OpenWeather API", "Chart.js", "Mapbox"],
    features: [
      "Location search with autocomplete",
      "Current weather conditions display",
      "7-day weather forecast",
      "Interactive weather maps",
      "Historical weather data",
      "Weather alerts and notifications",
      "Responsive design for all devices",
    ],
    challenges:
      "Handling the various data formats from different weather APIs and creating intuitive visualizations for complex weather data was challenging. I also needed to optimize the performance of map rendering.",
    solution:
      "I created a unified data model that normalized responses from different API endpoints and used Chart.js for optimized data visualization. For maps, I implemented lazy loading and tile optimization with Mapbox.",
    liveUrl: "https://example.com/weather",
    codeUrl: "https://github.com/username/weather-dashboard",
    featured: false,
  },
  {
    id: 5,
    title: "API Gateway Service",
    description:
      "A microservice gateway for managing API requests, authentication, and rate limiting.",
    longDescription:
      "This API Gateway service acts as a central entry point for all client requests to various microservices in a distributed application architecture. It handles cross-cutting concerns such as authentication, authorization, rate limiting, request routing, and monitoring. Built with Node.js and Express, it features a plugin architecture for extensibility and uses Redis for caching and rate limiting implementations.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80",
    category: "backend",
    technologies: ["Node.js", "Express", "Redis", "Docker"],
    features: [
      "API request routing and load balancing",
      "Authentication and authorization",
      "Rate limiting and throttling",
      "Request/response transformation",
      "Caching implementation",
      "Logging and monitoring",
      "Service discovery integration",
    ],
    challenges:
      "Designing a system that could handle high traffic volumes while maintaining low latency was challenging. Additionally, implementing effective rate limiting that didn't impact legitimate users required careful consideration.",
    solution:
      "I implemented a distributed rate limiting system using Redis and designed an efficient caching strategy to reduce backend load. The service was containerized with Docker for easy scaling and deployed with orchestration tools.",
    liveUrl: "#",
    codeUrl: "https://github.com/username/api-gateway",
    featured: false,
  },
  {
    id: 6,
    title: "Content Management System",
    description:
      "A custom CMS with content creation tools, media management, and user permissions.",
    longDescription:
      "This custom Content Management System was built to provide a flexible and user-friendly platform for managing website content. It features rich text editing, media management, user roles and permissions, content versioning, and scheduling capabilities. The frontend was built with Next.js for server-side rendering and optimal performance, while Supabase provided the backend database and authentication services.",
    image:
      "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    category: "full-stack",
    technologies: ["Next.js", "PostgreSQL", "Supabase", "TailwindCSS"],
    features: [
      "WYSIWYG content editor",
      "Media library with image optimization",
      "User roles and permissions",
      "Content versioning and rollbacks",
      "Scheduled publishing",
      "SEO optimization tools",
      "Content templates and reusable blocks",
    ],
    challenges:
      "Creating a flexible content model that could accommodate various types of content while maintaining good performance was challenging. I also needed to implement a robust permission system to control access to content.",
    solution:
      "I designed a modular content structure with customizable fields and implemented a hierarchical permission system. For performance, I utilized Next.js server-side rendering and implemented efficient database queries with PostgreSQL.",
    liveUrl: "https://example.com/cms",
    codeUrl: "https://github.com/username/custom-cms",
    featured: true,
  },
];
