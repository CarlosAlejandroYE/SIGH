<?php
 include_once('conexion.php');
 $accion = isset($_POST['accion'])?$_POST['accion']:'';
 
    if($accion=="Entradas"){      
        $sql="SELECT * from Entradas";
        $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
    }

    if($accion=="Salidas"){      
        $sql="SELECT * from Salidas";
        $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
    }

//eliminar
    if($accion=="obtDelete"){
        $id=$_POST["id"];
         $sql="SELECT * from Entradas where CvEntrada=$id";
        $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
    }

    if($accion=="Delete"){
        $id=$_POST['id'];
        $sql="DELETE FROM Entradas WHERE CvEntrada=$id";
        if($conexion->query($sql) == true){
            echo json_encode('Dato Eliminado');		
        }else{
            echo json_encode('Error al eliminar');
        } 
    }

    if($accion=="obtDeleteSa"){
        $id=$_POST["id"];
         $sql="SELECT * from Salidas where CvSalida=$id";
        $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
    }

    if($accion=="DeleteSa"){
        $id=$_POST['id'];
        $sql="DELETE FROM Salidas WHERE CvSalida=$id";
        if($conexion->query($sql) == true){
            echo json_encode('Dato Eliminado');		
        }else{
            echo json_encode('Error al eliminar');
        } 
    }

    //insertar 
    if($accion=="Insert"){
        $f=$_POST['f'];
        $c=$_POST['c'];
        $sql="INSERT INTO Entradas (CvEntrada,fecha,Cantidad) values ('','$f',$c)";
            if($conexion->query($sql) == true){
                echo json_encode('Dato Insertado');		
            }else{
                echo json_encode('Error al insertar');
            } 
    }

    if($accion=="InsertSld"){
        $f=$_POST['f'];
        $c=$_POST['c'];
        $m=$_POST['m'];
        $sql="INSERT INTO Salidas (CvSalida,fecha,Cantidad,Concepto) values ('','$f',$c,'$m')";
            if($conexion->query($sql) == true){
                echo json_encode('Dato Insertado');		
            }else{
                echo json_encode('Error al insertar');
            } 
    }



    //actualizar
    if($accion=="Update"){
        $f=$_POST['f'];
        $c=$_POST['c'];
        $cv=$_POST['cv'];
        $sql="UPDATE Entradas set fecha='$f', Cantidad=$c where CvEntrada=$cv";
         if($conexion->query($sql) == true){
                echo json_encode('Dato Actualizado');		
            }else{
                echo json_encode('Error al Actualizar');
            } 
    }

     if($accion=="UpdateSa"){
        $m=$_POST['m'];
        $f=$_POST['f'];
        $c=$_POST['c'];
        $cv=$_POST['cv'];
        $sql="UPDATE Salidas set fecha='$f', Cantidad=$c, Concepto='$m' where CvSalida=$cv";
         if($conexion->query($sql) == true){
                echo json_encode('Dato Actualizado');		
            }else{
                echo json_encode('Error al Actualizar'.$sql);
            } 
    }

    
     if($accion=="Greport"){
         $mt=$_POST['month'];
         $yr=$_POST['year'];
         $sql="SELECT * FROM Entradas WHERE MONTH(fecha) = $mt AND YEAR(fecha) = $yr";
         $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
     }

     if($accion=="Gsalidas"){
         $mt=$_POST['month'];
         $yr=$_POST['year'];
         $sql="SELECT * FROM Salidas WHERE MONTH(fecha) = $mt AND YEAR(fecha) = $yr";
         $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
     }
?>