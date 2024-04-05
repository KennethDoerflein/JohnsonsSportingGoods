# Johnson's Sporting Goods

**Initial Setup**
1. Open Git Bash
2. clone repo: `git clone https://github.com/KennethDoerflein/JohnsonsSportingGoods.git`
3. Exit Git Bash
4. Open command prompt in the 'JohnsonsSportingGoods' directory or use the terminal in VSCode
5. In the 'JohnsonsSportingGoods' directory create the virtual environment: `py -m venv JSG_venv`
6. Activate the virtual environment: `JSG_venv\Scripts\activate`
7. Switch to the 'JSG' directory: `cd JSG`
8. Install requirements: `pip install -r requirements.txt`
9. Apply migrations: `python manage.py migrate`
10. Test Django server: `py manage.py runserver`
11. Quit server: ctrl + c

**Normal use (list may not be complete)**
1. Activate the virtual environment `JSG_venv\Scripts\activate`
2. Start Django server: `py manage.py runserver`
3. Visit `http://127.0.0.1:8000`
