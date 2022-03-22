var UserUX = document.getElementById("InterfazUser");
var regs = "";
var regsSlds = "";
var accion = "";
var table2 = "";

var ent = 0;
var sali = 0;
// funcion parfa cerrar sesion
function cerrarsesion() {
    window.location.href = "http://localhost:3000/login/login.html";
}

function Interfaz(intfz) {
    regs = "";
    regsSlds = "";
    ent = 0;
    sali = 0;
  if (intfz == "ECG") {

    accion = "Salidas";
    $.post('datos.php', { accion }, function (response) {
      var dat = JSON.parse(response)
      console.log(dat);
      for (let itm of dat) {
        sali = sali + parseInt(itm.Cantidad);
        regsSlds += `
                    <tr>
                      <td>
                       `
          + itm.fecha +
          `
                      </td>
                      <td>
                    `+ itm.Cantidad + `  
                      </td>
                       <td>
                    `+ itm.Concepto + `  
                      </td>
                    </tr>
                `
      }

      table2 = `
        
        <table border="1" width="50%">
           <tr>
                <td>
                  <b>Fecha Resgistrada</b>
                </td>
                <td>
                  <b>Cantidad</b>
                </td>
                <td>
                  <b>Concepto</b>
                </td>
            </tr>
            `
        + regsSlds +
        `
         </table>
           
            
        `;
      $("#Ints").val(sali);
    });


    accion = "Entradas";
    $.post('datos.php', { accion }, function (response) {
      var dat = JSON.parse(response)
      console.log(dat);
      for (let itm of dat) {
        ent = ent + parseInt(itm.Cantidad);
        regs += `
                    <tr>
                      <td>
                       `
          + itm.fecha +
          `
                      </td>
                      <td>
                    `+ itm.Cantidad + `  
                      </td>
                    </tr>
                `
      }

      UserUX.innerHTML = `
         <input class="InputText" type="text" value="ESTADO GENERAL DE CAJA" disabled>  <br><br>
         
         <input class="InputText2" type="text" value="ESTADO DE ENTRADAS" disabled> 
         <input class="InputText3" type="text" value="ESTADO DE SALIDAS" disabled> 
                <br>
         <table border="1" style="float: left;" width="50%">
            <tr>
                <td>
                  <b>Fecha Resgistrada</b>
                </td>
                <td>
                  <b>Cantidad</b>
                </td>
            </tr>
            `+ regs + `
         </table> 
         `
        + table2 +
        `<br>
         <br>
         <br>
         <br>
         <br>
            <div>
             <input id="total" class="InputText4" type="text" disabled> 
            </div> 
          
            <canvas id="oilChart" width="600" height="400"></canvas>
        `;
      $("#Inpe").val(ent);
      var et = document.getElementById("Inpe").value;
      var sl = document.getElementById("Ints").value;
      var tc = parseFloat(et) - parseFloat(sl);
      $("#total").val("Saldo Total Disponible: $" + tc);
      
      var ete = parseFloat(et);
      var ets = parseFloat(sl);
          var oilCanvas = document.getElementById("oilChart");
          Chart.defaults.global.defaultFontFamily = "Lato";
          Chart.defaults.global.defaultFontSize = 18;
      oilCanvas.height = 150;
          var oilData = {
            labels: [
              "Entradas: $"+et,
              "Salidas: $"+sl,
              
            ],
            datasets: [
              {
                data: [ete,ets],
                backgroundColor: [
                  "rgb(26, 187, 11)",
                 "rgb(187, 11, 11)",
                  
                ]
              }]
          };

          var pieChart = new Chart(oilCanvas, {
            type: 'pie',
            data: oilData
          });
        
        
        });    
      
  }
  
  if (intfz == "RE") {
    var dateToday = new Date();
    var day = dateToday.getDate();
  
      accion = "Entradas";
    $.post('datos.php', { accion }, function (response) {
      var dat = JSON.parse(response)
      console.log(dat);
      for (let itm of dat) {
        ent = ent + parseInt(itm.Cantidad);
        regs += `
                    <tr taskid=`+ itm.CvEntrada +`>
                    <td hidden>
                    `
                    +itm.CvEntrada+
                    `
                    </td>
                      <td>
                       `
          + itm.fecha +
          `
                      </td>
                      <td>
                    `+ itm.Cantidad + `  
                      </td>
                      <td>
                      <input class="task-delete buttonData02" type="button" value="Eliminar" onclick="DeleteEn();">
                      <input class="task-item buttonData01" type="button" value="Modificar" onclick="ModiDa();">
                      </td>
                    </tr>
                `
      }

      UserUX.innerHTML = `
         <input class="InputText" type="text" value="REGISTRO DE ENTRADAS" disabled>  <br><br>
         
         <input class="InputText2" type="text" value="OFRENDAS" disabled> 
                <br>
         <table border="1" style="float: left;" width="50%">
            <tr>
                <td>
                  <b>Fecha Resgistrada</b>
                </td>
                <td>
                  <b>Cantidad</b>
                </td>
                <td>
                  <b>Acciones</b>
                </td>
            </tr>
            `+ regs + `
         </table> 

         <div>
          <table>
           <tr>
           <td>
              <input class="captura" disabled value="Fecha">
              <input class="captura2" type="date" id="fech" name="fech"
                min="2022-01-01" max="2060-12-31">
              <br>
              <br>
              <input class="captura" disabled value="Cantidad">
               <input class="captura2" id="cant" maxlength="9" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
               <br>
              <br>
               <input class="ButIns" id="Insert" type="button" value="GUARDAR" onclick="SaveRgs();">
               <br>
               <br>
               <input class="captura" id="Cancelar" type="button" value="Cancelar" onclick="Interfaz('RE');">
           </td>
           </tr>
          </table>
         </div>
         <input id="cv" type="hidden">
         `
      document.getElementById("fech").value = dateToday.toJSON().slice(0, 10);
    });
   
  }
  
  if (intfz == "RS") {
      var dateToday = new Date();
      var day = dateToday.getDate();

      accion = "Salidas";
      $.post('datos.php', { accion }, function (response) {
        var dat = JSON.parse(response)
        console.log(dat);
        for (let itm of dat) {
          ent = ent + parseInt(itm.Cantidad);
          regs += `
                    <tr taskid=`+ itm.CvSalida + `>
                    <td hidden>
                    `
            + itm.CvSalida +
            `
                    </td>
                      <td>
                       `
            + itm.fecha +
            `
                      </td>
                      <td>
                    `+ itm.Cantidad + `  
                      </td>
                      <td>
                      `
                      + itm.Concepto +
                      `
                      </td>
                      <td>
                      <input class="task-delete buttonData02" type="button" value="Eliminar" onclick="DeleteSa();">
                      <input class="task-item buttonData01" type="button" value="Modificar" onclick="ModifSa();">
                      </td>
                    </tr>
                `
        }

        UserUX.innerHTML = `
         <input class="InputText" type="text" value="REGISTRO DE SALIDAS" disabled>  <br><br>
         
         <input class="InputText2" type="text" value="OFRENDAS" disabled> 
                <br>
         <table border="1" style="float: left;" width="50%">
            <tr>
                <td>
                  <b>Fecha Resgistrada</b>
                </td>
                <td>
                  <b>Cantidad</b>
                </td>
                <td>
                  <b>Motivo de gasto</b>
                </td>
                <td>
                  <b>Acciones</b>
                </td>
            </tr>
            `+ regs + `
         </table> 

         <div>
          <table>
           <tr>
           <td>
              <input class="captura" disabled value="Fecha">
              <input class="captura2" type="date" id="fech" name="fech"
                min="2022-01-01" max="2060-12-31">
              <br>
              <br>
              <input class="captura" disabled value="Cantidad">
               <input class="captura2" id="cant" maxlength="9" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;">
               <br>
               <br>
              <input class="captura" disabled value="Motivo:">
               <input class="captura2" id="Motv">
               <br>
              <br>
               <input class="ButIns" id="Insert" type="button" value="GUARDAR" onclick="SaveRgSd();">
               <br>
               <br>
               <input class="captura" id="Cancelar" type="button" value="Cancelar" onclick="Interfaz('RS');">
           </td>
           </tr>
          </table>
         </div>
         <input id="cv" type="hidden">
         `
        document.getElementById("fech").value = dateToday.toJSON().slice(0, 10);
      });
    }
    if (intfz == "GR") {
        UserUX.innerHTML = `
         <input class="InputText" type="text" value="Generar Reporte" disabled>  
         <br> <br>
         <div class="position">
            <label>Seleccionar mes y año:</label>  
            <select id="months" class="selectClass">
              <option value="-" disabled selected>Mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select> 
            <select id="an" class="selectClass" onchange="Greport();">

            </select>             
         </div>
         <section id="tables">
         
         </section>
        `
  }
  
  let options = `<option value="-" disabled selected>Año</option>`;
  var dateToday = new Date();
  var year = dateToday.getFullYear();
  for (let i = 2019; i <= year; i++){
    options = options + `<option value=`+i+`>`+i+`</option>`;
  }
  document.getElementById("an").innerHTML = options;
}

//guardar
function SaveRgs() {
  if (document.getElementById("Insert").value == "GUARDAR") {
    var f = document.getElementById("fech").value;
    var c = document.getElementById("cant").value;
    var accion = "Insert";
    $.post('datos.php', { f, c, accion }, function (response) {
      const dat = JSON.parse(response);
      if (dat == "Dato Insertado") {
        alerta(dat, "success");
      } else {
        alerta(dat, "error");
      }
      Interfaz("RE");
    });
  }
  if (document.getElementById("Insert").value == "Guardar Modificación") {
    UpdateDat();
  }
}
function SaveRgSd() {
  if (document.getElementById("Insert").value == "GUARDAR") {
    var f = document.getElementById("fech").value;
    var c = document.getElementById("cant").value;
    var m = document.getElementById("Motv").value;
    var accion = "InsertSld";
    $.post('datos.php', { f, c,m, accion }, function (response) {
      const dat = JSON.parse(response);
      if (dat == "Dato Insertado") {
        alerta(dat, "success");
      } else {
        alerta(dat, "error");
      }
      Interfaz("RS");
    });
  }
  if (document.getElementById("Insert").value == "Guardar Modificación") {
    UpdateDatS();
  }
}


//eiminar entradas
function DeleteEn() {
  $(document).on('click', '.task-delete', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('taskid');
    console.log(id);
    var accion = "obtDelete";
    $.post('datos.php', { id, accion }, function (response) {
      const resp = JSON.parse(response);
      for (let itm of resp) {
        document.getElementById("fech").value = itm.fecha;
        document.getElementById("cant").value = itm.Cantidad;
      }
      var f = document.getElementById("fech").value;
      var c = document.getElementById("cant").value;
      DeleteEnt(id,f,c);
     });
  });

}
function DeleteEnt(id,fch,ct) {
  Swal.fire({
    title: '¿Estas seguro de eliminar?',
    text: "fecha: "+fch+" cantidad: $"+ct,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      ConfirmDelete(id);
    } else {
      Interfaz("RE");
    }
  });
} 
function ConfirmDelete(id) {
  var accion = "Delete";
  $.post('datos.php', { id, accion }, function (response) {
    console.log(response);
    var dat = JSON.parse(response)
    if (dat == 'Dato Eliminado') {
      alerta(dat, "success");
    } else {
      alerta(dat, "error");      
    }
    Interfaz("RE");
  });
}

//eliminar salidas
function DeleteSa() {
  $(document).on('click', '.task-delete', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('taskid');
    console.log(id);
    var accion = "obtDeleteSa";
    $.post('datos.php', { id, accion }, function (response) {
      const resp = JSON.parse(response);
      for (let itm of resp) {
        document.getElementById("fech").value = itm.fecha;
        document.getElementById("cant").value = itm.Cantidad;
        document.getElementById("Motv").value = itm.Concepto;
      }
      var f = document.getElementById("fech").value;
      var c = document.getElementById("cant").value;
      var m = document.getElementById("Motv").value;
      DeleteSald(id, f, c,m);
    });
  });

}
function DeleteSald(id, fch, ct) {
  Swal.fire({
    title: '¿Estas seguro de eliminar?',
    text: "fecha: " + fch + " cantidad: $" + ct,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      ConfirmDeleteSal(id);
    } else {
      Interfaz("RS");
    }
  });
}
function ConfirmDeleteSal(id) {
  var accion = "DeleteSa";
  $.post('datos.php', { id, accion }, function (response) {
    console.log(response);
    var dat = JSON.parse(response)
    if (dat == 'Dato Eliminado') {
      alerta(dat, "success");
    } else {
      alerta(dat, "error");
    }
    Interfaz("RS");
  });
}

//MODIFICAR entradas
function ModiDa() {
  document.getElementById("Insert").value = "Guardar Modificación";
  $(document).on('click', '.task-item', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('taskid');
    console.log(id);
    var accion = "obtDelete";
    $.post('datos.php', { id, accion }, function (response) {
      const resp = JSON.parse(response);
      for (let itm of resp) {
        document.getElementById("cv").value = itm.CvEntrada;
        document.getElementById("fech").value = itm.fecha;
        document.getElementById("cant").value = itm.Cantidad;
      }
      var f = document.getElementById("fech").value;
      var c = document.getElementById("cant").value;
    });
  });
}
function UpdateDat() {
  var f = document.getElementById("fech").value;
  var c = document.getElementById("cant").value;
  var cv = document.getElementById("cv").value;
  var accion = "Update";
  $.post('datos.php', { f, c,cv, accion }, function (response) {
    const dat = JSON.parse(response);
    if (dat == "Dato Actualizado") {
      alerta(dat, "success");
    } else {
      alerta(dat, "error");
    }
    Interfaz("RE");
  });
}

//modificar salidas
function ModifSa() {
  document.getElementById("Insert").value = "Guardar Modificación";
  $(document).on('click', '.task-item', function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('taskid');
    console.log(id);
    var accion = "obtDeleteSa";
    $.post('datos.php', { id, accion }, function (response) {
      const resp = JSON.parse(response);
      for (let itm of resp) {
        document.getElementById("cv").value = itm.CvSalida;
        document.getElementById("fech").value = itm.fecha;
        document.getElementById("cant").value = itm.Cantidad;
        document.getElementById("Motv").value = itm.Concepto;
      }
      var f = document.getElementById("fech").value;
      var c = document.getElementById("cant").value;
    });
  });
}
function UpdateDatS() {
  var f = document.getElementById("fech").value;
  var c = document.getElementById("cant").value;
  var m = document.getElementById("Motv").value;
  var cv = document.getElementById("cv").value;
  var accion = "UpdateSa";
  $.post('datos.php', { m,f, c, cv, accion }, function (response) {
    const dat = JSON.parse(response);
    console.log(dat)
    if (dat == "Dato Actualizado") {
      alerta(dat, "success");
    } else {
      alerta(dat, "error");
    }
    Interfaz("RS");
  });
}

//generar reporte
function Greport() {
  var datTable = ``;
  var regs = ``;
  var regs2 = ``;
  var month = document.getElementById("months").value;
  var year = document.getElementById("an").value;
  var Tme = 0;
  var Tms = 0;
  var sm = 0;
  var st = 0;
  var accion="Greport"
  $.post('datos.php', { accion, month, year }, function (response) {
    var dat = JSON.parse(response);
    console.log(dat);
    for (let itm of dat) {
      Tme = Tme + parseFloat(itm.Cantidad);
      regs = regs + `
        <tr>
        <td>
          `
        +itm.fecha+
        `</td>
        <td>
        `
        +itm.Cantidad+
        `
        </td>
        </tr>
      `;
    }
    accion = "Gsalidas";
    $.post('datos.php', { accion, month, year }, function (response) {
      var dat = JSON.parse(response);
      console.log(dat);
      for (let itm of dat) {
        Tms = Tms + parseFloat(itm.Cantidad);
        regs2 = regs2 + `
        <tr>
        <td>
          `
          + itm.fecha +
          `</td>
        <td>
        `
          + itm.Cantidad +
          `
        </td>
        <td>
        `+itm.Concepto+`
        </td>
        </tr>
      `;
      }

      datTable = `
    <br>
     <table border=1 style="float: left;" width="50%">
      <tr>
       <td>
        Fecha
       </td>
       <td>
        Cantidad
       </td>
      </tr>
      `+ regs + ` 
     </table>

      <table border=1  width="50%">
      <tr>
       <td>
        Fecha
       </td>
       <td>
        Cantidad
       </td>
        <td>
        Concepto
       </td>
      </tr>
      `+regs2+`      
     </table>
     <br>
     <br>
     <br>
      <br>
     <br>
     <br>
     <div class="report">
      <input id="totalmes" class="InputText7" type="text" disabled> 
      <input id="ts" class="InputText6" type="text" disabled> 
      <input id="mes" class="InputText7" type="text" disabled> 
       <input id="Tc" class="InputText7" type="text" disabled> 
    </div>
    `;
      sm = Tme - Tms;
      document.getElementById("tables").innerHTML = datTable;
      document.getElementById("totalmes").value ="Total entradas: $"+ Tme;
      document.getElementById("ts").value = "Total Salidas: $" + Tms;
      document.getElementById("mes").value = "Total Restante de mes: $" + sm;

      accion = "Salidas";
      $.post('datos.php', { accion }, function (response) {
        var sali = 0;
        var ent = 0;
        var dat = JSON.parse(response)
        console.log(dat);
        for (let itm of dat) {
          sali = sali + parseFloat(itm.Cantidad);
        }

        accion = "Entradas";
        $.post('datos.php', { accion }, function (response) {
          var resp = JSON.parse(response)
          console.log(resp);
          for (let itm of resp) {
            ent = ent + parseFloat(itm.Cantidad);
          }
          var ToC = ent - sali;
          document.getElementById("Tc").value = "Saldo Total: $" + ToC;
        });
        
        
        });
     
    });
  });

}
function alerta(mensaje, icono) {
  Swal.fire({
    position: 'center',
    icon: icono,
    title: mensaje,
    showConfirmButton: false,
    timer: 2500
  })
}