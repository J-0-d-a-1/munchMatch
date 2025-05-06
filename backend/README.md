We use ruby version 3.1.1 and rails, '~> 7.1' for this project

1.  **Clone the Repository:**
    ```bash
    git clone <https://github.com/J-0-d-a-1/munchMatch.git>
    cd MunchMatch
    ```
2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    bundle install
    ```
3.  **Set up the Database:**
    ```bash
    rails db:create
    rails db:migrate
    ```
4.  **Configure Environment Variables:**
    - Create a `.env` file based on the `env.example`.
5.  **Start the Rails Server:**
    ```bash
    bin/rails server
    ```
