document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const studentTableBody = document.getElementById('student-tbody');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        const emailId = document.getElementById('emailId').value.trim();
        const contactNo = document.getElementById('contactNo').value.trim();

        if (!validateInputs(studentName, studentId, emailId, contactNo)) {
            alert('Please provide valid inputs.');
            return;
        }

        addStudentRecord(studentName, studentId, emailId, contactNo);
        form.reset();
    });

    const validateInputs = (name, id, email, contact) => {
        const namePattern = /^[A-Za-z\s]+$/;
        const idPattern = /^\d+$/;
        const contactPattern = /^\d+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.match(namePattern)) return false;
        if (!id.match(idPattern)) return false;
        if (!contact.match(contactPattern)) return false;
        if (!email.match(emailPattern)) return false;

        return true;
    };

    const addStudentRecord = (name, id, email, contact) => {
        const studentRecords = getStudentRecords();
        studentRecords.push({ name, id, email, contact });
        localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
        displayStudentRecords();
    };

    const getStudentRecords = () => {
        return JSON.parse(localStorage.getItem('studentRecords')) || [];
    };

    const displayStudentRecords = () => {
        studentTableBody.innerHTML = '';
        const studentRecords = getStudentRecords();
        studentRecords.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.id}</td>
                <td>${record.email}</td>
                <td>${record.contact}</td>
                <td class="actions">
                    <button onclick="editStudentRecord(${index})">Edit</button>
                    <button onclick="deleteStudentRecord(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    };

    window.editStudentRecord = (index) => {
        const studentRecords = getStudentRecords();
        const record = studentRecords[index];
        document.getElementById('studentName').value = record.name;
        document.getElementById('studentId').value = record.id;
        document.getElementById('emailId').value = record.email;
        document.getElementById('contactNo').value = record.contact;
        studentRecords.splice(index, 1);
        localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
        displayStudentRecords();
    };

    window.deleteStudentRecord = (index) => {
        const studentRecords = getStudentRecords();
        studentRecords.splice(index, 1);
        localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
        displayStudentRecords();
    };

    displayStudentRecords();
});
