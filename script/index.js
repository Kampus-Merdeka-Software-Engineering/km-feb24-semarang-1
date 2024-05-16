const toggleDropdown1 = () => {
    document.getElementById("myDropdown1").classList.toggle("show");
  };
  
const toggleDropdown2 = () => {
    document.getElementById("myDropdown2").classList.toggle("show");
  };
const toggleDropdown3 = () => {
    document.getElementById("myDropdown3").classList.toggle("show");
  };
  window.onclick = (event) => {
    if (!event.target.matches(".dropbtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (
          openDropdown.classList.contains("show") &&
          event.target.id !== "searchInput1" &&
          event.target.id !== "searchInput2" &&
          event.target.id !== "searchInput3"
        ) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  
  document.getElementById("searchInput1").addEventListener("keyup", (event) => {
    // Pengecualian saat mengetik di input search
    event.stopPropagation();
  
    const input = document.getElementById("searchInput1");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown1");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  });
  
  document.getElementById("searchInput2").addEventListener("keyup", (event) => {
    // Pengecualian saat mengetik di input search
    event.stopPropagation();
  
    const input = document.getElementById("searchInput2");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown2");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  });

  document.getElementById("searchInput3").addEventListener("keyup", (event) => {
    // Pengecualian saat mengetik di input search
    event.stopPropagation();
  
    const input = document.getElementById("searchInput3");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown3");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
      const txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  });
  
  document
    .getElementById("dropdownButton1")
    .addEventListener("click", toggleDropdown1);
  document
    .getElementById("dropdownButton2")
    .addEventListener("click", toggleDropdown2);
    document
    .getElementById("dropdownButton3")
    .addEventListener("click", toggleDropdown3);