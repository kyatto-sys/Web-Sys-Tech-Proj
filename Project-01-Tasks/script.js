 function createStars() {
            const starsContainer = document.getElementById('stars');
            const numberOfStars = 100;
            
            for (let i = 0; i < numberOfStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }
        createStars();
        function convertToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }

        function convertTemp() {
            const celsiusInput = document.getElementById('celsius');
            const resultDiv = document.getElementById('tempResult');
            const celsius = parseFloat(celsiusInput.value);

            if (isNaN(celsius)) {
                resultDiv.textContent = 'Please enter a valid number';
                resultDiv.style.borderLeftColor = '#ff6b6b';
                return;
            }

            const fahrenheit = convertToFahrenheit(celsius);
            resultDiv.textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
            resultDiv.style.borderLeftColor = '#667eea';
        }

        function isEven(num) {
            return num % 2 === 0 ? "Even" : "Odd";
        }

        function checkEvenOdd() {
            const numberInput = document.getElementById('number');
            const resultDiv = document.getElementById('evenOddResult');
            const num = parseInt(numberInput.value);

            if (isNaN(num)) {
                resultDiv.textContent = 'Please enter a valid number';
                resultDiv.style.borderLeftColor = '#ff6b6b';
                return;
            }

            const result = isEven(num);
            resultDiv.textContent = `${num} is ${result}`;
            resultDiv.style.borderLeftColor = '#667eea';
        }

        function getCartTotal(cart) {
            let total = 0;
            for (const item of cart) {
                total += item.price;
            }
            return total;
        }

        function calculateCartTotal() {
            const resultDiv = document.getElementById('cartResult');
            
            const cart = [
                { name: "Laptop", price: 20000 },
                { name: "Mouse", price: 500 },
                { name: "Keyboard", price: 1500}
            ];

            const total = getCartTotal(cart);
            resultDiv.textContent = `Cart Total: $${total.toFixed(2)}`;
            resultDiv.style.borderLeftColor = '#667eea';
        }

        function getStudentGrade(name, records) {
            for (const record of records) {
                if (record.name === name) {
                    return record.grade;
                }
            }
            return "Not found";
        }

        function lookupGrade() {
            const nameSelect = document.getElementById('studentName');
            const resultDiv = document.getElementById('gradeResult');
            const selectedName = nameSelect.value;

       
            if (!selectedName) {
                resultDiv.textContent = 'Please select a student';
                resultDiv.style.borderLeftColor = '#ff6b6b';
                return;
            }
            const records = [
                { name: "Kat", grade: "A" },
                { name: "Jannice", grade: "B+" },
                { name: "Rhon", grade: "A-" },
                { name: "Shiela", grade: "B" },
                { name: "Carl", grade: "A-" },
                { name: "Danice", grade: "A-" },
                { name: "Zien", grade: "B" }
            ];

            const grade = getStudentGrade(selectedName, records);
            resultDiv.textContent = `${selectedName}'s Grade: ${grade}`;
            resultDiv.style.borderLeftColor = '#667eea';
        }

        function showGreeting() {
            const nameInput = document.getElementById('userName');
            const greetingDiv = document.getElementById('greeting');
            const name = nameInput.value.trim();


            if (!name) {
                greetingDiv.textContent = 'Please enter your name';
                greetingDiv.style.borderLeftColor = '#ff6b6b';
                return;
            }

            greetingDiv.textContent = `Hello, ${name}!`;
            greetingDiv.style.borderLeftColor = '#667eea';
        }

        document.getElementById('celsius').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') convertTemp();
        });

        document.getElementById('number').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkEvenOdd();
        });

        document.getElementById('userName').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') showGreeting();
        });