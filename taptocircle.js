
      let storedCircle = [];
      let redoCircle = [];
      let content = document.querySelector(".contentArea");
        const resetBtn = document.querySelector(".reset-button");
      const undoBtn = document.querySelector(".undo-button");
      const redoBtn = document.querySelector(".redo-button");

      function updateButtons() {
        undoBtn.disabled = storedCircle.length === 0;
        redoBtn.disabled = redoCircle.length === 0;
        resetBtn.disabled = storedCircle.length === 0 && redoCircle.length === 0;
      }
      
      content.addEventListener("click", function (e) {
        let circle = document.createElement("div");
        circle.className = "circle";
        let color = "#" + Math.round(Math.random() * 1000000);
        circle.style.backgroundColor = color;
        circle.style.left = e.clientX + "px";
        circle.style.top = e.clientY + "px";
        storedCircle.push(circle);
      //  console.log(storedCircle); 
        
        content.appendChild(circle);
        updateButtons();
       
      });
      let reset = document.querySelector(".reset-button");
      reset.addEventListener("click", function (e) {
        content.innerHTML=""
        storedCircle=[]
        redoCircle=[]
        updateButtons();
      });

      let undo = document.querySelector(".undo-button");
      undo.addEventListener("click", function () {
        if (storedCircle.length == 0) {
          return;
          
        }

        let undocircle = storedCircle.pop();
        redoCircle.push(undocircle);
        //  console.log(redoCircle)
        undocircle.style.display = "none";
        updateButtons();
      });
      
      let redobtn = document.querySelector(".redo-button");
      redobtn.addEventListener("click", function (e) {
       if(redoCircle.length==0){
        return;
       }
        let redo_circle=redoCircle.pop();
        redo_circle.style.display='block'
        storedCircle.push(redo_circle)
        updateButtons();
      });
      updateButtons();