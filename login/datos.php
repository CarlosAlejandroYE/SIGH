<?php
 include_once('conexion.php');
 $accion = isset($_POST['accion'])?$_POST['accion']:'';
 
    if($accion=="Login"){
        $user=$_POST['username'];
        $pass=$_POST['password'];
        $sql="SELECT * from Usuarios where UserName='$user' and Pass='$pass';";
        $Data=array();
        $result=mysqli_query($conexion,$sql);
        $c=0;
        while($mostrar=mysqli_fetch_array($result)){        
            $Data[$c]=$mostrar;
            $c++;
        }
        echo json_encode($Data);
    }

    if($accion=="updateEdo"){
        $id=$_POST['cv'];
        $sql2 = "UPDATE Usuarios SET Estado = 1 WHERE CvUser = $id";
        if($conexion->query($sql2) === true){    
            echo json_encode('Hecho');
        }else{
            echo json_encode('Error');
        }  
    }
?>