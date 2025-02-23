## Railway Deployment Configuration

This document outlines the Railway settings for deploying a Go application.

**Source Settings**

* **Source Repository:** Your project's Git repository.
* **Root Directory:** `server/straightAceServer` (This specifies the directory containing your Go application's source code).
* **Branch:** `rw-deploy` (Ensure you are deploying from the correct branch).

**Build Settings**

* **Custom Build Command:** `go build -o main`
    * This command compiles your Go application.
    * `main.go` must reside in the same directory as `go.mod`.
    * `main` is the name of the output executable file.

**Deploy Settings**

* **Custom Start Command:** `./main`
    * This command executes the compiled Go application.
    * This is a Linux-compatible command.

**Actual URL**

* `https://straightace-qa.up.railway.app/auth/test`
    * This is the URL where your deployed application can be accessed.
    * It also shows a specific endpoint `/auth/test`