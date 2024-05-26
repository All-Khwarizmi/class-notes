# System Architecture Overview

The system is designed with a layered architecture, allowing for separation of concerns, scalability, and maintainability. Here's an overview of each layer and how they interact:

## Infra Layer

**Responsibilities**:
- Interacts directly with the external world.
- Handles all communications with databases and external APIs.
- Provides an abstraction layer over external services and data sources to facilitate testing and decoupling.

**Error Handling**:
- Catches and logs errors related to network failures, database access issues, and external API timeouts.
- Transforms these errors into standardized error codes (e.g., `INF100`, `INF101`, `INF102`) that are propagated to higher layers.

## Application Layer

**Responsibilities**:
- Contains the business logic of the system.
- Divided into repositories and use cases:
  - **Repositories**: Responsible for fetching and storing data via the infra layer.
  - **Use Cases**: Handle the application-specific business rules and decision-making processes.

**Error Handling**:
- Handles errors received from the infra layer by applying business logic to decide whether to retry operations, skip them, or escalate errors.
- Generates error codes (e.g., `APP200`, `APP201`, `APP202`) related to user input validation, authorization issues, and business rule violations.

## Presentation Layer

**Responsibilities**:
- Manages all user interface and presentation logic.
- Adapts the data received from the application layer to fit the UI requirements.
- Provides interactive interfaces for user inputs and displays data.

**Error Handling**:
- Manages user input errors by providing immediate feedback (e.g., form validation errors).
- Displays user-friendly error messages based on error codes received from the application layer (e.g., `PRE300`, `PRE301`, `PRE302`).
- Handles UI-specific errors such as unsupported media types or missing required fields.

## Data Flow

1. **From External to Infra**: External data and requests are received by the infra layer, which handles all external communications.
2. **Infra to Application**: The infra layer passes data along with any relevant errors to the application layer.
3. **Application Processing**: The application layer processes this data, applying business logic and handling any errors from the infra layer.
4. **Application to Presentation**: Processed data is sent from the application layer to the presentation layer.
5. **User Interaction**: Users interact with the system through the presentation layer, which sends user input back to the application layer for processing.

This architecture ensures that each layer only handles concerns specific to its domain, promoting a clean and maintainable codebase. It also facilitates easier debugging and testing by isolating functionalities.
