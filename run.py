# run.py
import os
import subprocess
import shutil

# Define the paths relative to the project root
BACKEND_PATH = "backend"
FRONTEND_PATH = "frontend"
absolute_frontend_path = os.path.abspath(FRONTEND_PATH)
BUILD_OUTPUT_PATH = os.path.join(FRONTEND_PATH, "dist")  # Vite default build folder
STATIC_FOLDER_PATH = os.path.join(BACKEND_PATH, "static")


def run_command(command, cwd=None):
    """A helper function to run shell commands with error handling."""
    print(f"Executing command: {' '.join(command)} in directory: {cwd or os.getcwd()}")
    try:
        # Pass the command as a list of arguments, which is safer
        subprocess.run(command, check=True, cwd=cwd, shell=True)
        print("✅ Command completed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing command: {e.cmd}")
        exit(1)


def main():
    print("--- Step 1: Installing Backend Dependencies ---")
    run_command(
        ["pip", "install", "-r", os.path.join(BACKEND_PATH, "requirements.txt")]
    )

    print("\n--- Step 2: Installing Frontend Dependencies ---")
    # Pass the command as a list and specify the cwd
    run_command(["npm", "install"], cwd=FRONTEND_PATH)

    print("\n--- Step 3: Compiling the Frontend (React) ---")
    # Pass the command as a list
    run_command(["npm", "run", "build"], cwd=FRONTEND_PATH)

    print("\n--- Step 4: Integrating React Build with Flask ---")
    if os.path.exists(STATIC_FOLDER_PATH):
        print(f"Removing old static folder: {STATIC_FOLDER_PATH}")
        shutil.rmtree(STATIC_FOLDER_PATH)

    print(f"Copying build from {BUILD_OUTPUT_PATH} to {STATIC_FOLDER_PATH}")
    shutil.copytree(BUILD_OUTPUT_PATH, STATIC_FOLDER_PATH)
    print("✅ Frontend build integrated.")

    print("\n--- Step 5: Running the Flask Backend ---")
    # Pass the command as a list
    run_command(["python", "app.py"], cwd=BACKEND_PATH)


if __name__ == "__main__":
    main()
