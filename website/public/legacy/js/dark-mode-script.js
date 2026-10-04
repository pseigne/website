function darkmode() {


    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDarkMode) {
        
        document.body.classList.toggle('light-mode');
    } else {
       
        document.body.classList.toggle('dark-mode');

    }
    
}


// function lightmode {
//     // document.getElementById('moon').
// }