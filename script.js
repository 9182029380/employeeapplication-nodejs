const form = document.getElementById('employeeForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const empId = document.getElementById('empId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;

    const data = {
        empId,
        name,
        email,
        password,
        department,
        salary
    };

    try {
        const response = await fetch('http://localhost:3000/addemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Employee added successfully!');
            form.reset();
        } else {
            alert('Failed to add employee');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});