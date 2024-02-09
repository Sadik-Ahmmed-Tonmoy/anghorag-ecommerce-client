const addGrandTotalToSession = (data) => {
    // Convert the data to a string before storing in session storage
    const totalWithDiscount = JSON.stringify(data);

    // Save data to session storage under a specific key
    sessionStorage.setItem('totalWithDiscount', totalWithDiscount);
};

export { addGrandTotalToSession}