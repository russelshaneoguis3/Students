from flask import Flask, render_template, request, url_for, flash
from werkzeug.utils import redirect
from flask_mysqldb import MySQL


app = Flask(__name__)
app.secret_key = 'many random bytes' 

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'project'

mysql = MySQL(app)

#landing page & data display
@app.route('/')
def Index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM students")
    data = cur.fetchall()
    cur.close()
    
    return render_template('index.html', students=data)

#insert student function
@app.route('/insert', methods = ['POST'])
def insert():
    if request.method == "POST":
        flash("New Student Added")
        name = request.form['name']
        age = request.form['age']
        email = request.form['email']
        phone = request.form['phone']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO students (name, age, email, phone) VALUES (%s, %s, %s, %s)", (name, age, email, phone))
        mysql.connection.commit()
        return redirect(url_for('Index'))
    
#delete student function 
@app.route('/delete/<string:id_data>', methods = ['GET'])
def delete(id_data):
    flash("Student Record Has Been Deleted Successfully")
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM students WHERE id=%s", (id_data,))
    mysql.connection.commit()
    return redirect(url_for('Index'))

#update function
@app.route('/update', methods= ['POST', 'GET'])
def update():
    if request.method == 'POST':
        id_data = request.form['id']
        name = request.form['name']
        age = request.form['age']
        email = request.form['email']
        phone = request.form['phone']

        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE students SET name=%s, age=%s, email=%s, phone=%s
        WHERE id=%s
        """, (name, age, email, phone, id_data))
        flash("Student Data Updated Successfully")
        return redirect(url_for('Index'))
    

if __name__ == "__main__":
    app.run(debug=True)
    
