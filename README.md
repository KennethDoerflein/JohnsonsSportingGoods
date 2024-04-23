# Johnson's Sporting Goods
**Note: Depending on your python install it may be `py` or `python` or `python3`**

**Using a Zip**
  **Windows**
    **Initial Setup and Use**
      1. Unzip file
      2. Open JohnsonsSportingGoods (`JohnsonsSportingGoods/`) in VSCode
      3. Navigate to the terminal
      4. In terminal make sure you are in `JohnsonsSportingGoods/` (the directory with manage.py check with `ls`) 
      5. Create the virtual environment: `py -m venv JSG_venv`
      6. Activate the virtual environment: `JSG_venv\Scripts\activate`
      7. Install requirements: `pip install -r requirements.txt`
      8. Apply migrations: `py manage.py migrate`
      9. Start Django server: `py manage.py runserver`
      10. Visit `http://127.0.0.1:8000`

      **Normal use**
        1. Activate the virtual environment `JSG_venv\Scripts\activate`
        2. Start Django server: `py manage.py runserver`
        3. Visit `http://127.0.0.1:8000`

  **MacOS/Linux**
    **Initial Setup and Use**
      1. Unzip file
      2. Open JohnsonsSportingGoods (`JohnsonsSportingGoods/`) in VSCode
      3. Navigate to the terminal
      4. In terminal make sure you are in `JohnsonsSportingGoods/` (the directory with manage.py check with `ls`) 
      5. Create the virtual environment: `python3 -m venv JSG_venv`
      6. Activate the virtual environment: `source JSG_venv/bin/activate`
      7. Install requirements: `pip install -r requirements.txt`
      8. Apply migrations: `python3 manage.py migrate`
      9. Start Django server: `python3 manage.py runserver`
      10. Visit `http://127.0.0.1:8000`

      **Normal use**
        1. Activate the virtual environment `source JSG_venv/bin/activate`
        2. Start Django server: `python3 manage.py runserver`
        3. Visit `http://127.0.0.1:8000`

**Cloning From Github**
  **Initial Setup**
  1. Open Git Bash
  2. clone repo: `git clone https://github.com/KennethDoerflein/JohnsonsSportingGoods.git`
  3. Exit Git Bash
  4. Open command prompt in the 'JohnsonsSportingGoods' directory or use the terminal in VSCode
  5. In the 'JohnsonsSportingGoods' directory create the virtual environment: `py -m venv JSG_venv`
  6. Activate the virtual environment: `JSG_venv\Scripts\activate`
  7. Install requirements: `pip install -r requirements.txt`
  8. Apply migrations: `py manage.py migrate`
  9. Test Django server: `py manage.py runserver`
  10. Quit server: ctrl + c

  **Normal use (list may not be complete)**
  1. Activate the virtual environment `JSG_venv\Scripts\activate`
  2. Start Django server: `py manage.py runserver`
  3. Visit `http://127.0.0.1:8000`

  ### Test User account
  username: `test`
  password: `mypassword123`
