# Tab Jumper

Tab Jumper is a browser extension that allows you to quickly jump between tabs.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/oggnimodd/tab-jumper.git
    cd tab-jumper
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

## Development

1.  **Build the extension:**

    ```bash
    bun run build
    ```

2.  **Start development mode (with hot-reloading):**

    ```bash
    bun run dev
    ```

3.  **Run the extension in a browser:**

    ```bash
    bun run start
    ```

    This will open a new browser window with the extension loaded. Any changes you make in development mode will automatically reload in the browser.

## Configuration

This project uses environment variables for sensitive configuration. A `.env.example` file is provided to show the required variables.

1.  **Create your .env file:**

    ```bash
    cp .env.example .env
    ```

2.  **Edit .env:**
    Open the newly created `.env` file and fill in the values for `AMO_JWT_ISSUER` and `AMO_JWT_SECRET`. You can obtain these keys from [https://addons.mozilla.org/en-US/developers/addon/api/key/](https://addons.mozilla.org/en-US/developers/addon/api/key/).
