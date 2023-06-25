$(window).scroll(function () {
    if ($(this).scrollTop() > 0 && $(window).width() > 992) {
      $(".navbar").addClass("nav-sticky");
    } else if ($(window).width() < 992) {
      $(".navbar").addClass("nav-sticky");
    } else $(".navbar").removeClass("nav-sticky");
  });


  
  window.onload = () => {
    let button = document.querySelector("#btn");
  
    // Function for calculating BMI
    button.addEventListener("click", calculateBMI);
  };
  
  function calculateBMI() {
  
    /* Getting input from user into height variable.
    Input is string so typecasting is necessary. */
    let height = parseInt(document
        .querySelector("#height").value);
  
    /* Getting input from user into weight variable.
    Input is string so typecasting is necessary.*/
    let weight = parseInt(document
        .querySelector("#weight").value);

    /* Getting input  from user into age variable.
    Input is string so typecasting is necessary. */
    let age=(document
        .querySelector("#age").value);
  
    let result = document.querySelector("#result");
  
    // Checking the user providing a proper
    // value or not
    if (height === "" || isNaN(height))
      result.innerHTML = "قد را به درستی وارد کنید";
  
    else if (weight === "" || isNaN(weight))
      result.innerHTML = "وزن را به درستی وارد کنید ";

    else if(age==="" || isNaN(age))
      result.innerHTML = "سن ا به درستی وارد کنید";
  
    // If both input is valid, calculate the bmi
    else {
  
      // Fixing upto 2 decimal places
      let bmi = (weight / ((height * height)
                / 10000)).toFixed(2);
  
      // Dividing as per the bmi conditions
      if (bmi < 18.6) result.innerHTML =
        `<h4>کمبود وزن : <span>${bmi} <i class="fa-solid fa-arrow-down"></i></span></h4>
        <p>
                <br><br>
                با حفظ وزن بدن سالم، خطر ابتلا به مشکلات جدی سلامتی را کاهش می دهید.
        </p>
`;
  
      else if (bmi >= 18.6 && bmi < 24.9)
        result.innerHTML =
          `<h4>نرمال : <span>${bmi} <i class="fa-solid fa-check"></i></span></h4>
           <p>
                <bold>شکل عالی!</bold>
                <br><br>
                با حفظ وزن بدن سالم، خطر ابتلا به مشکلات جدی سلامتی را کاهش می دهید. 
           </p>
`;
  
      else result.innerHTML =
            `<h4>اضافه وزن : <span>${bmi} <i class="fa-solid fa-arrow-up"></i></span></h4>
             <p>
                <bold>وقت دویدن!</i></bold>
                <br><br>
                با حفظ وزن بدن سالم، خطر ابتلا به مشکلات جدی سلامتی را کاهش می دهید.
            </p>`;
    }
  }

  // js for bottom to top button
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});