# Johnson's Sporting Goods
**Note: Depending on your python install it may be `py` or `python` or `python3`**

# **Using a Zip**

**Windows**
**Initial Setup and Use**
  1. Unzip file
  2. Open JohnsonsSportingGoods-main (`JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\`) in VSCode
  3. Navigate to the terminal
  4. In terminal make sure you are in `JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\` (the directory with JSG/ check with `ls`) 
  5. Create the virtual environment: `py -m venv JSG_venv`
  6. Activate the virtual environment: `JSG_venv\Scripts\activate`
  7. Install requirements: `pip install -r requirements.txt`
  8. Switch to JSG directory `cd JSG`
  9. Apply migrations: `py manage.py migrate`
  10. Start Django server: `py manage.py runserver`
  11. Visit `http://127.0.0.1:8000`
      
**Normal use**
  1. Open JohnsonsSportingGoods-main (`JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\`) in VSCode
  2. Activate the virtual environment `JSG_venv\Scripts\activate`
  3. Start Django server: `py manage.py runserver`
  4. Visit `http://127.0.0.1:8000`

**MacOS/Linux**
**Initial Setup and Use**
  1. Unzip file
  2. Open JohnsonsSportingGoods-main (`JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\`) in VSCode
  3. Navigate to the terminal
  4. In terminal make sure you are in `JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\` (the directory with JSG/ check with `ls`) 
  5. Create the virtual environment: `python3 -m venv JSG_venv`
  6. Activate the virtual environment: `source JSG_venv/bin/activate`
  7. Install requirements: `pip install -r requirements.txt`
  8. Switch to JSG directory `cd JSG`
  9. Apply migrations: `python3 manage.py migrate`
  10. Start Django server: `python3 manage.py runserver`
  11. Visit `http://127.0.0.1:8000`
      
**Normal use**
  1. Open JohnsonsSportingGoods-main (`JohnsonsSportingGoods-main\JohnsonsSportingGoods-main\`) in VSCode
  2. Activate the virtual environment `source JSG_venv/bin/activate`
  3. Start Django server: `python3 manage.py runserver`
  4. Visit `http://127.0.0.1:8000`


# **Cloning From Github**

  **Initial Setup**
  1. Open Git Bash
  2. clone repo: `git clone https://github.com/KennethDoerflein/JohnsonsSportingGoods.git`
  3. Exit Git Bash
  4. Open command prompt in the 'JohnsonsSportingGoods' directory or use the terminal in VSCode
  5. In the 'JohnsonsSportingGoods' directory create the virtual environment: `py -m venv JSG_venv`
  6. Activate the virtual environment: `JSG_venv\Scripts\activate`
  7. Install requirements: `pip install -r requirements.txt`
  8. Switch to JSG directory `cd JSG`
  9. Apply migrations: `py manage.py migrate`
  10. Test Django server: `py manage.py runserver`
  11. Quit server: ctrl + c

  **Normal use (list may not be complete)**
  1. Open JohnsonsSportingGoods (`JohnsonsSportingGoods`) in VSCode
  2. Activate the virtual environment `JSG_venv\Scripts\activate`
  3. Start Django server: `py JSG\manage.py runserver`
  4. Visit `http://127.0.0.1:8000`

  ### Test User account
  username: `test`
  password: `mypassword123`
