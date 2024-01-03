const socket = io();

document.getElementById('commandForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('commandInput').value;
    fetch('/input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    });
    document.getElementById('commandInput').value = '';
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'c') {
        fetch('/ctrl-c', { method: 'POST' });
    } else if (e.ctrlKey && e.key === 'd') {
        fetch('/ctrl-d', { method: 'POST' });
    }
});

socket.on('output', function(data) {
    const output = document.getElementById('output');
    output.textContent += data;
    output.scrollTop = output.scrollHeight;
});

document.getElementById('getAllCommandsButton').addEventListener('click', function() {
    fetch('/allcommands')
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('db-output');
            output.textContent += JSON.stringify(data, null, 2);
            output.scrollTop = output.scrollHeight;
        });
});