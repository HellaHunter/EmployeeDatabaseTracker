INSERT INTO department (department_name)
VALUES
    ("Maintenance"),
    ("Administration"),
    ("Legal"),
    ("Sales"),
    ("Human Resources"),
    ("Internet Technology"),
    ("Customer Experience");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Specialist", 30000, 4),
    ("IT Specialist II", 75000, 6),
    ("HR Payroll", 90000, 5),
    ("Accountant III", 110000, 2),
    ("Maintenance Tech I", 50000, 1),
    ("Customer Experience Lead", 65000, 7),
    ("Software Engineer", 105000, 6),
    ("Administrative Assistant", 40000, 2),
    ("Maintenance Manager", 80000, 1),
    ("Paralegal Assistant", 50000, 3),
    ("Compliance Lawyer", 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Michael", "Zarn", 1, null),
    ("Katara", "Ramirez", 2, null),
    ("Robert", "Howerton", 3, null),
    ("Charles", "Carter", 4, null),
    ("Mark", "Lebowitz", 5, null),
    ("Nancy", "Saramucci", 6, null),
    ("Douglas", "Gore", 7, null),
    ("Frederick", "Kruger", 8, null),
    ("Jason", "Voorhees", 9, 5),
    ("Tom", "Clancy", 10, null),
    ("Kaneki", "Ken", 11, 10);
