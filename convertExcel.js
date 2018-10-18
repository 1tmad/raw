window.addEventListener('load',function(){
               let newForm = document.createElement('div');
               newForm.id = "formDiv";
               newForm.innerHTML = "<label for=\"excelFile\">Выберите файл для загрузки: </label><input type=\"file\" id=\"excelFile\"  accept=\".xls, .xlsx\" /><input type=\"button\" id=\"convertFile\" value=\"Go!\"/>";
                let parentBody = document.querySelector('body');
                parentBody.insertAdjacentElement("beforeBegin", newForm);

               document.getElementById('excelFile').value = ""; 

               document.getElementById('convertFile').onclick = handleFile;

           let rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

           function handleFile() {
               let file = document.getElementById('excelFile').files[0];
               if (file !== undefined && file.size !== 0) {
                 if(file.name.search(/\.(xls|xlsx)$/) !== -1) {
                     let reader = new FileReader();
                     reader.onload = function (evt) {
                         let data = evt.target.result;
                         if (!rABS) data = new Uint8Array(data);
                         let workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});

                         let first_sheet_name = workbook.SheetNames[0];
                         let worksheet = workbook.Sheets[first_sheet_name];
                         console.log(XLSX.utils.sheet_to_json(worksheet));
                     };
                     if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
                 }else{ alert("Выбран файл с неверным форматом!"); }
               }else{ alert("Пожалуйста, выберите файл!"); }
           }
        }, false);
