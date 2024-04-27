document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const prob = document.getElementById('prob').value;
    const loc = document.getElementById('loc').value;

    try {
        const response = await fetch('http://localhost:3000/doctors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prob, loc })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const resultContainer = document.getElementById('doctors');
        resultContainer.innerHTML = ''; // Clear previous results
        data.forEach(item => {
            const doctorHTML = `
                <div class="doctor">
                <div class="doctorcontext">

                    <div>Name: ${item.Doctor_name}</div>
                    <div>Specialization: ${item.Specialization}</div>
                    <div>City: ${item.City}</div>
                    </div>
                <div class="doctorimg">
                <img src="doctor.png" width="65" height="65" alt="">
                </div>
                </div>
            `;
            resultContainer.insertAdjacentHTML('beforeend', doctorHTML);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
