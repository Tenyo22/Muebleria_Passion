/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : muebles

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 12/07/2023 21:00:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id_admin` tinyint NOT NULL AUTO_INCREMENT,
  `username` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_rol` tinyint NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_admin`) USING BTREE,
  INDEX `fk_id_rol_admin`(`id_rol`) USING BTREE,
  CONSTRAINT `fk_id_rol_admin` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cancelacion
-- ----------------------------
DROP TABLE IF EXISTS `cancelacion`;
CREATE TABLE `cancelacion`  (
  `id_cancelacion` smallint NOT NULL,
  `numero_pedido` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cantidad_cancelacion` tinyint NOT NULL,
  `motivo_cancelacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_cancelacion`) USING BTREE,
  INDEX `fk_numero_pedido_cancelacion`(`numero_pedido`) USING BTREE,
  CONSTRAINT `fk_numero_pedido_cancelacion` FOREIGN KEY (`numero_pedido`) REFERENCES `venta` (`numero_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for categoria
-- ----------------------------
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria`  (
  `id_categoria` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_categoria`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente`  (
  `id_cliente` smallint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ape1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ape2` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `telefono` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `id_rol` tinyint NOT NULL,
  `id_usuario` smallint NOT NULL,
  `pais` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estado` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `municipio` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `codigo_postal` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `delegacion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `colonia` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `calle` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num_ext` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num_int` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_cliente`) USING BTREE,
  INDEX `fk_id_rol`(`id_rol`) USING BTREE,
  INDEX `fk_id_usuario`(`id_usuario`) USING BTREE,
  CONSTRAINT `fk_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for color
-- ----------------------------
DROP TABLE IF EXISTS `color`;
CREATE TABLE `color`  (
  `id_color` smallint NOT NULL AUTO_INCREMENT,
  `nombre_color` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_color`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for detalle_venta
-- ----------------------------
DROP TABLE IF EXISTS `detalle_venta`;
CREATE TABLE `detalle_venta`  (
  `id_dv` smallint NOT NULL AUTO_INCREMENT,
  `numero_pedido` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `clave_producto` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precio_venta` float NOT NULL,
  `cantidad_venta` tinyint NOT NULL,
  `cantidad_promocion` tinyint NOT NULL,
  `cargo_cancelacion` float NOT NULL DEFAULT 0,
  `subtotal` float NOT NULL,
  PRIMARY KEY (`id_dv`) USING BTREE,
  INDEX `fk_numero_pedido`(`numero_pedido`) USING BTREE,
  INDEX `fk_clave_producto_dv`(`clave_producto`) USING BTREE,
  CONSTRAINT `fk_clave_producto_dv` FOREIGN KEY (`clave_producto`) REFERENCES `producto` (`clave_producto`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_numero_pedido` FOREIGN KEY (`numero_pedido`) REFERENCES `venta` (`numero_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for factura
-- ----------------------------
DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura`  (
  `id_factura` smallint NOT NULL AUTO_INCREMENT,
  `numero_pedido` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_factura`) USING BTREE,
  INDEX `fk_num_ped_factura`(`numero_pedido`) USING BTREE,
  CONSTRAINT `fk_num_ped_factura` FOREIGN KEY (`numero_pedido`) REFERENCES `venta` (`numero_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for material
-- ----------------------------
DROP TABLE IF EXISTS `material`;
CREATE TABLE `material`  (
  `id_material` smallint NOT NULL AUTO_INCREMENT COMMENT 'Identificador autoincrementable',
  `material` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Nombre del material',
  `cantidad` smallint NOT NULL COMMENT 'Cantidad que dispone',
  `stock_min` tinyint NOT NULL COMMENT 'Cantidad minima que debe tener para llamar al proveedor',
  `stock_max` smallint NOT NULL COMMENT 'Cantidad maxima que puede llegar a tener',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Valor que identifica si sigue manejando ese material o no',
  PRIMARY KEY (`id_material`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for producto
-- ----------------------------
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto`  (
  `clave_producto` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_producto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precio` float NOT NULL,
  `id_promocion` tinyint NOT NULL,
  `id_categoria` smallint NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`clave_producto`) USING BTREE,
  INDEX `fk_id_promocion`(`id_promocion`) USING BTREE,
  INDEX `fk_producto_categoria`(`id_categoria`) USING BTREE,
  CONSTRAINT `fk_id_promocion` FOREIGN KEY (`id_promocion`) REFERENCES `promocion` (`id_promocion`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for producto_color
-- ----------------------------
DROP TABLE IF EXISTS `producto_color`;
CREATE TABLE `producto_color`  (
  `id_prod_color` smallint NOT NULL,
  `id_color` smallint NOT NULL,
  `clave_producto` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_prod_color`) USING BTREE,
  INDEX `fk_id_color_producto`(`id_color`) USING BTREE,
  INDEX `fk_clave_prod_color`(`clave_producto`) USING BTREE,
  CONSTRAINT `fk_clave_prod_color` FOREIGN KEY (`clave_producto`) REFERENCES `producto` (`clave_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_color_producto` FOREIGN KEY (`id_color`) REFERENCES `color` (`id_color`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for producto_material
-- ----------------------------
DROP TABLE IF EXISTS `producto_material`;
CREATE TABLE `producto_material`  (
  `id_pm` smallint NOT NULL AUTO_INCREMENT,
  `id_material` smallint NOT NULL,
  `clave_producto` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_pm`) USING BTREE,
  INDEX `fk_id_material_prod_mat`(`id_material`) USING BTREE,
  INDEX `fk_clave_producto_material`(`clave_producto`) USING BTREE,
  CONSTRAINT `fk_clave_producto_material` FOREIGN KEY (`clave_producto`) REFERENCES `producto` (`clave_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_material_prod_mat` FOREIGN KEY (`id_material`) REFERENCES `material` (`id_material`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for promocion
-- ----------------------------
DROP TABLE IF EXISTS `promocion`;
CREATE TABLE `promocion`  (
  `id_promocion` tinyint NOT NULL AUTO_INCREMENT,
  `id_tipo_promocion` tinyint NOT NULL,
  `cantidad_promocion` tinyint NOT NULL,
  `status_promocion` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_promocion`) USING BTREE,
  INDEX `fk_id_tipo_promocion`(`id_tipo_promocion`) USING BTREE,
  CONSTRAINT `fk_id_tipo_promocion` FOREIGN KEY (`id_tipo_promocion`) REFERENCES `tipo_promocion` (`id_tipo_promocion`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol`  (
  `id_rol` tinyint NOT NULL AUTO_INCREMENT,
  `tipo_rol` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_rol`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tipo_promocion
-- ----------------------------
DROP TABLE IF EXISTS `tipo_promocion`;
CREATE TABLE `tipo_promocion`  (
  `id_tipo_promocion` tinyint NOT NULL AUTO_INCREMENT,
  `descripcion_promocion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_tipo_promocion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `id_usuario` smallint NOT NULL AUTO_INCREMENT,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_usuario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for venta
-- ----------------------------
DROP TABLE IF EXISTS `venta`;
CREATE TABLE `venta`  (
  `numero_pedido` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_cliente` smallint NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `total` float NOT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`numero_pedido`) USING BTREE,
  INDEX `fk_id_cliente_venta`(`id_cliente`) USING BTREE,
  CONSTRAINT `fk_id_cliente_venta` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for delete_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_admin`;
delimiter ;;
CREATE PROCEDURE `delete_admin`(p_id_admin TINYINT)
BEGIN
	DECLARE v_status CHAR;
	
	SELECT admin.`status` INTO v_status
	FROM admin
	WHERE admin.id_admin = TRIM(p_id_admin);
	
	IF v_status > 0 THEN
		UPDATE admin
		SET admin.`status` = 0
		WHERE admin.id_admin = TRIM(p_id_admin);
		
		SELECT 'El administrador ha sido eliminado' AS result;
	ELSE
		SELECT 'No existe el administrador' AS result;
END IF;

	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_categoria`;
delimiter ;;
CREATE PROCEDURE `delete_categoria`(p_id_categoria SMALLINT)
BEGIN
	DECLARE v_status CHAR;
	SELECT categoria.`status` INTO v_status
	FROM categoria
	WHERE categoria.id_categoria = TRIM(p_id_categoria);
	
	IF v_status > 0 THEN
		UPDATE categoria
		SET categoria.`status` = 0
		WHERE categoria.id_categoria = TRIM(p_id_categoria);
		SELECT 'Categoria Eliminada con Exito!' AS result;
	ELSE
		UPDATE categoria
		SET categoria.`status` = 1
		WHERE categoria.id_categoria = p_id_categoria;
		SELECT 'Categoria Agregada con Exito!' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_cliente`;
delimiter ;;
CREATE PROCEDURE `delete_cliente`(p_id_cliente SMALLINT)
BEGIN
	DECLARE v_status CHAR;
	
	SELECT cliente.status INTO v_status
	FROM cliente
	WHERE cliente.id_cliente = TRIM(p_id_cliente);

	IF v_status > 0 THEN
		UPDATE cliente
		SET cliente.status = 0
		WHERE cliente.id_cliente = TRIM(p_id_cliente);
	
		SELECT 'Cliente Eliminado!' AS result;
	ELSE
		SELECT 'El cliente no existe' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_color
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_color`;
delimiter ;;
CREATE PROCEDURE `delete_color`(p_id_color SMALLINT)
BEGIN
	-- Verificar si el color existe
  IF EXISTS (SELECT 1 FROM color WHERE color.id_color = p_id_color AND color.`status` = 1) THEN
		-- Actualizar el estado a 0
    UPDATE color SET color.`status` = 0 WHERE color.id_color = p_id_color;
		SELECT 'Eliminación exitosa' AS mensaje;
  ELSE
    SELECT 'El color no existe' AS mensaje;
  END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_material
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_material`;
delimiter ;;
CREATE PROCEDURE `delete_material`(p_id_material SMALLINT)
BEGIN
	DECLARE v_status CHAR;
	
	SELECT material.`status` INTO v_status
	FROM material
	WHERE material.id_material = TRIM(p_id_material);
	
	IF v_status > 0 THEN
		UPDATE material
		SET material.`status` = 0
		WHERE material.id_material = TRIM(p_id_material);
		SELECT 'Eliminacion correcta!' AS result;
	ELSE
		SELECT 'El material no existe!' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_pedido
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_pedido`;
delimiter ;;
CREATE PROCEDURE `delete_pedido`(p_folio_venta VARCHAR(15))
BEGIN
	UPDATE venta
	SET venta.`status` = 0
	WHERE venta.numero_pedido = p_folio_venta;
	
	SELECT 'Pedido Finalizado con Exito!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_producto`;
delimiter ;;
CREATE PROCEDURE `delete_producto`(p_clave_producto VARCHAR(10))
BEGIN
	DECLARE v_status CHAR;
	
	SELECT producto.`status` INTO v_status
	FROM producto
	WHERE producto.clave_producto = TRIM(p_clave_producto);
	
	IF v_status > 0 THEN
		UPDATE producto
		SET producto.`status` = 0
		WHERE producto.clave_producto = TRIM(p_clave_producto);
		
		SELECT 'Producto Eliminado' AS result;
	ELSE
		UPDATE producto
		SET producto.`status` = 1
		WHERE producto.clave_producto = TRIM(p_clave_producto);
		SELECT 'Producto Nuevamente en Produccion!' AS result;
END IF;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_promocion`;
delimiter ;;
CREATE PROCEDURE `delete_promocion`(p_id_promocion TINYINT)
BEGIN
	UPDATE promocion
	SET promocion.status_promocion = 0
	WHERE promocion.id_promocion = TRIM(p_id_promocion);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_tipo_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_tipo_promocion`;
delimiter ;;
CREATE PROCEDURE `delete_tipo_promocion`(p_id_tipo_promo TINYINT)
BEGIN
	DECLARE v_status TINYINT;
	
	SELECT tipo_promocion.`status` INTO v_status
	FROM tipo_promocion
	WHERE tipo_promocion.id_tipo_promocion = TRIM(p_id_tipo_promo);
	
	IF(v_status > 0) THEN
		UPDATE tipo_promocion
		SET tipo_promocion.`status` = 0
		WHERE tipo_promocion.id_tipo_promocion = TRIM(p_id_tipo_promo);
		SELECT 'Promocion eliminada' AS result;
	ELSE
		SELECT 'La promocion no existe' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for delete_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `delete_usuario`;
delimiter ;;
CREATE PROCEDURE `delete_usuario`(p_id_usuario SMALLINT)
BEGIN
	DECLARE v_status CHAR;
	
	SELECT usuario.status INTO v_status
	FROM usuario
	WHERE usuario.id_usuario = TRIM(p_id_usuario);

	IF v_status > 0 THEN
		UPDATE usuario
		SET usuario.status = 0
		WHERE usuario.id_usuario = TRIM(p_id_usuario);
		
		SELECT 'Usuario Eliminado con Exito!' AS result;
	ELSE
		SELECT 'El usuario no existe!' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for facturaCliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `facturaCliente`;
delimiter ;;
CREATE PROCEDURE `facturaCliente`(p_folio VARCHAR(15))
BEGIN
	SELECT
		venta.numero_pedido AS NumeroPedido,
		DATE(venta.fecha_pedido) AS Fecha, 
		CONCAT(cliente.ape1, ' ', cliente.ape2, ' ', cliente.nombre) AS Cliente, 
		CONCAT(cliente.municipio, ' ', cliente.delegacion) AS Localidad,
		CONCAT(cliente.colonia, ' ', cliente.calle) AS Domicilio
	FROM
		venta
		INNER JOIN
		cliente
		ON 
			venta.id_cliente = cliente.id_cliente
	WHERE
		venta.numero_pedido = p_folio;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for generarFactura
-- ----------------------------
DROP PROCEDURE IF EXISTS `generarFactura`;
delimiter ;;
CREATE PROCEDURE `generarFactura`(p_folio VARCHAR(15))
BEGIN
	SELECT
		producto.nombre_producto AS Producto, 
		detalle_venta.cantidad_venta AS Cantidad, 
		detalle_venta.precio_venta AS Precio, 
		detalle_venta.subtotal AS Importe
	FROM
		detalle_venta
		INNER JOIN
		producto
		ON 
			detalle_venta.clave_producto = producto.clave_producto
	WHERE
		detalle_venta.numero_pedido = p_folio;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_admin`;
delimiter ;;
CREATE PROCEDURE `insert_admin`(p_username VARCHAR(15),
	p_password VARCHAR(100))
BEGIN
	DECLARE v_status TINYINT;
	
	SELECT COUNT(*) INTO v_status
	FROM admin
	WHERE admin.username = TRIM(p_username);
	
	IF v_status > 0 THEN
		SELECT 'El usuario administrador ya existe';
		
		UPDATE admin
		SET admin.`status` = 1
		WHERE admin.username = TRIM(p_username);
	ELSE
		INSERT admin
		VALUES(DEFAULT, TRIM(p_username), TRIM(p_password), '1', '1');
		
		SELECT 'Administrador Agregado!' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_categoria`;
delimiter ;;
CREATE PROCEDURE `insert_categoria`(p_nombre VARCHAR(150),
	p_descripcion VARCHAR(255))
BEGIN
	DECLARE v_status CHAR;
	SELECT categoria.id_categoria INTO v_status
	FROM categoria
	WHERE categoria.nombre = TRIM(p_nombre)
	LIMIT 1;
	
	IF v_status > 0 THEN
		UPDATE categoria
		SET categoria.nombre = TRIM(p_nombre),
			categoria.descripcion = TRIM(p_descripcion),
			categoria.`status` = 1;
		SELECT 'La categoria ya existe' AS result;
	ELSE		
		INSERT categoria
		VALUES(DEFAULT, TRIM(p_nombre), TRIM(p_descripcion), 1);
		SELECT 'Categoria Agregada!' AS result;
	END IF;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_cliente`;
delimiter ;;
CREATE PROCEDURE `insert_cliente`(p_nombre VARCHAR(255),
	p_ape1 VARCHAR(255),
	p_ape2 VARCHAR(255),
	p_telefono VARCHAR(10),
	p_fecha_nacimiento DATE,
	p_usuario VARCHAR(150),
	p_estado VARCHAR(150),
	p_municipio VARCHAR(150),
	p_codigo_postal VARCHAR(10),
	p_delegacion VARCHAR(150),
	p_colonia VARCHAR(150),
	p_calle VARCHAR(200),
	p_num_ext VARCHAR(8),
	p_num_int VARCHAR(8))
BEGIN
	DECLARE v_username SMALLINT;
	
	SELECT usuario.id_usuario INTO v_username
	FROM usuario
	WHERE usuario.username = TRIM(p_usuario);

	INSERT cliente
	VALUES(DEFAULT, TRIM(p_nombre), TRIM(p_ape1), TRIM(p_ape2), TRIM(p_telefono), TRIM(p_fecha_nacimiento),
			2, v_username, 'Mexico', TRIM(p_estado), TRIM(p_municipio), TRIM(p_codigo_postal),
			TRIM(p_delegacion), TRIM(p_colonia), TRIM(p_calle), TRIM(p_num_ext), TRIM(p_num_int), 1);
	SELECT 'Cliente Agregado!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_color
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_color`;
delimiter ;;
CREATE PROCEDURE `insert_color`(p_nombre_color VARCHAR(100))
BEGIN
	DECLARE v_count_color INT;
	
	SELECT COUNT(*) INTO v_count_color
	FROM color
	WHERE color.nombre_color = TRIM(p_nombre_color)
	LIMIT 1;
	
	IF v_count_color > 0 THEN
		SELECT 'El color ya existe' AS result;
	ELSE
		INSERT color VALUES(DEFAULT, p_nombre_color, 1);
		SELECT 'Color guardado exitosamente' AS result;
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_detventa
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_detventa`;
delimiter ;;
CREATE PROCEDURE `insert_detventa`(p_numero_pedido VARCHAR(15),
	p_clave_producto VARCHAR(10),
	p_cantidad_producto TINYINT,
	p_username VARCHAR(100))
BEGIN
	DECLARE v_precio FLOAT;
	DECLARE v_promocion TINYINT;
	DECLARE v_subtotal FLOAT;
	DECLARE v_status TINYINT;
	DECLARE v_error TINYINT DEFAULT 0;
-- 	DECLARE v_id_cliente SMALLINT;
-- 	
-- 	SELECT cliente.id_cliente INTO v_id_cliente
-- 	FROM cliente
-- 	INNER JOIN usuario
-- 	ON cliente.id_usuario = usuario.id_usuario
-- 	WHERE usuario.username = p_username;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
		SET v_error = 1;
		ROLLBACK;
	END;
	
	START TRANSACTION;
	
	SELECT producto.precio INTO v_precio
	FROM producto
	WHERE producto.clave_producto = TRIM(p_clave_producto);

	SELECT promocion.cantidad_promocion INTO v_promocion
	FROM producto
	INNER JOIN promocion
	ON producto.id_promocion = promocion.id_promocion
	WHERE producto.clave_producto = TRIM(p_clave_producto);
	
	IF v_promocion > 0 THEN
		SET v_subtotal = (v_precio -(v_precio / v_promocion)) * p_cantidad_producto;
	ELSE
		SET v_subtotal = (v_precio * p_cantidad_producto);
	END IF;

	SELECT COUNT(venta.numero_pedido) INTO v_status
	FROM venta
	WHERE venta.numero_pedido = TRIM(p_numero_pedido);

	IF v_status > 0 THEN
		INSERT detalle_venta
		VALUES(DEFAULT, TRIM(p_numero_pedido), TRIM(p_clave_producto), v_precio, TRIM(p_cantidad_producto), v_promocion, 0, v_subtotal);
	ELSE
		CALL insert_venta(p_numero_pedido, p_username);
		INSERT detalle_venta
		VALUES(DEFAULT, TRIM(p_numero_pedido), TRIM(p_clave_producto), v_precio, TRIM(p_cantidad_producto), v_promocion, 0, v_subtotal);
	END IF;
	
	IF v_error = 0 THEN
		COMMIT;
		SELECT 'Detalle de Venta registrado!' AS result;
	ELSE
		SELECT 'Error en la transacción. No se pudo registrar el detalle de venta.' AS result;
	END IF;
-- 	SELECT 'Detalle de Venta registrado!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_material
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_material`;
delimiter ;;
CREATE PROCEDURE `insert_material`(p_material VARCHAR(150),
	p_cantidad SMALLINT,
	p_stock_min TINYINT,
	p_stock_max SMALLINT)
BEGIN
		DECLARE v_material TINYINT;
		
		SELECT material.id_material INTO v_material
		FROM material
		WHERE material.material = TRIM(p_material)
		LIMIT 1;
		
		IF v_material > 0 THEN
			SELECT 'El material ya existe' AS result;
			UPDATE material
			SET material.material = TRIM(p_material),
				material.cantidad = TRIM(p_cantidad),
				material.stock_min = TRIM(p_stock_min),
				material.stock_max = TRIM(p_stock_max),
				material.`status` = 1
			WHERE material.id_material = v_material;
		ELSE
			INSERT material
				VALUES(DEFAULT, TRIM(p_material), TRIM(p_cantidad), TRIM(p_stock_min), TRIM(p_stock_max), 1);
			SELECT 'Material agregado exitosamente!' AS result;
		END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_producto`;
delimiter ;;
CREATE PROCEDURE `insert_producto`(p_clave_producto VARCHAR(10),
	p_nombre_producto VARCHAR(150),
	p_descripcion_producto VARCHAR(255),
	p_image_path VARCHAR(255),
	p_precio FLOAT,
	p_id_promocion TINYINT,
	p_id_categoria SMALLINT)
BEGIN
	DECLARE v_status TINYINT;
	
	SELECT COUNT(*) INTO v_status
	FROM producto
	WHERE producto.clave_producto = TRIM(p_clave_producto);
	
	IF v_status > 0 THEN
		UPDATE producto
		SET producto.`status` = '1'
		WHERE producto.clave_producto = TRIM(p_clave_producto);
		
		SELECT 'El producto ya existe!' AS result;
	ELSE
		INSERT producto
		VALUES(TRIM(p_clave_producto), TRIM(p_nombre_producto), TRIM(p_descripcion_producto), TRIM(p_image_path), TRIM(p_precio), TRIM(p_id_promocion), TRIM(p_id_categoria), '1');
		
		SELECT 'Producto Agregado!' AS result;
	END IF;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_promocion`;
delimiter ;;
CREATE PROCEDURE `insert_promocion`(p_id_tipo_promocion TINYINT,
	p_cantidad_promocion TINYINT)
BEGIN
	INSERT promocion
	VALUES(DEFAULT, TRIM(p_id_tipo_promocion), TRIM(p_cantidad_promocion), 1);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_tipo_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_tipo_promocion`;
delimiter ;;
CREATE PROCEDURE `insert_tipo_promocion`(p_descripcion_promocion VARCHAR(255))
BEGIN
		DECLARE v_existe INT;

    -- Verificar si el tipo de promoción ya existe por la descripción
    SELECT COUNT(*) INTO v_existe
    FROM tipo_promocion
    WHERE tipo_promocion.descripcion_promocion = TRIM(p_descripcion_promocion)
		LIMIT 1;
		
    IF v_existe > 0 THEN
        SELECT 'El tipo de promoción ya existe' AS result;
				UPDATE tipo_promocion
				SET tipo_promocion.`status` = 1
				WHERE tipo_promocion.descripcion_promocion = TRIM(p_descripcion_promocion);
    ELSE
        -- Insertar el nuevo tipo de promoción
        INSERT tipo_promocion
        VALUES (DEFAULT, TRIM(p_descripcion_promocion), 1);

        SELECT 'Promoción insertada exitosamente' AS result;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_usuario`;
delimiter ;;
CREATE PROCEDURE `insert_usuario`(p_email VARCHAR(200),
	p_username VARCHAR(150),
	p_password VARCHAR(100))
BEGIN
	DECLARE v_email SMALLINT;
	DECLARE v_username SMALLINT;

	SELECT usuario.id_usuario INTO v_email
	FROM usuario
	WHERE usuario.email = TRIM(p_email);
	
	SELECT usuario.id_usuario INTO v_username
	FROM usuario
	WHERE usuario.username = TRIM(p_username);
	
	IF v_email IS NULL THEN
		IF v_username IS NULL THEN
			INSERT usuario
			VALUES(DEFAULT, TRIM(p_email), TRIM(p_username), TRIM(p_password), 1);
			SELECT 'Usuario registrado!' AS result;
		ELSE
			SELECT 'Username no disponible' AS result;
		END IF;
	ELSE
		SELECT 'Correo ya registrado anteriormente!';
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for insert_venta
-- ----------------------------
DROP PROCEDURE IF EXISTS `insert_venta`;
delimiter ;;
CREATE PROCEDURE `insert_venta`(p_folio_venta VARCHAR(15),
	p_username VARCHAR(100))
BEGIN
	DECLARE v_id_cliente SMALLINT;
	
	SELECT cliente.id_cliente INTO v_id_cliente
	FROM cliente
	INNER JOIN usuario
	ON cliente.id_usuario = usuario.id_usuario
	WHERE usuario.username = p_username;

	SET @fecha := NOW();
-- 	SELECT v_id_cliente;
	
	INSERT venta
	VALUES(p_folio_venta, v_id_cliente, @fecha, 0, '1');
	
	SELECT 'Venta creada!';
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_admin`;
delimiter ;;
CREATE PROCEDURE `select_admin`()
BEGIN
	SELECT admin.username AS Username,
		admin.`status` AS Activo
	FROM admin;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_a_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_a_categoria`;
delimiter ;;
CREATE PROCEDURE `select_a_categoria`(p_id_categoria SMALLINT)
BEGIN
	SELECT categoria.id_categoria AS ID,
		categoria.nombre AS Categoria,
		categoria.descripcion AS Descripcion
	FROM categoria
	WHERE categoria.id_categoria = p_id_categoria;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_a_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_a_producto`;
delimiter ;;
CREATE PROCEDURE `select_a_producto`(p_clave_producto VARCHAR(10))
BEGIN
	SELECT producto.nombre_producto AS Producto,
		producto.descripcion AS Descripcion,
		producto.image_path AS Imagen,
		producto.precio AS Precio,
		producto.id_promocion AS Promocion,
		producto.id_categoria AS Categoria
	FROM producto
	WHERE producto.clave_producto = p_clave_producto;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_a_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_a_usuario`;
delimiter ;;
CREATE PROCEDURE `select_a_usuario`(p_email VARCHAR(150),
	p_contra VARCHAR(100))
BEGIN
	SELECT usuario.email AS Email,
		usuario.`password`	AS 'Password',
		usuario.username AS Username
	FROM usuario
	WHERE usuario.email = p_email
	AND usuario.`password` = p_contra;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_categoria`;
delimiter ;;
CREATE PROCEDURE `select_categoria`()
BEGIN
	SELECT categoria.id_categoria AS ID,
		categoria.nombre AS Categoria,
		categoria.descripcion AS Descripcion,
		categoria.`status` AS Activo
	FROM categoria
	ORDER BY Categoria;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_cliente`;
delimiter ;;
CREATE PROCEDURE `select_cliente`()
BEGIN
	SELECT CONCAT(cliente.ape1, ' ', cliente.ape2, ' ', cliente.nombre) AS Cliente,
		cliente.telefono AS Telefono,
		cliente.fecha_nacimiento AS 'Fecha Nacimiento',
		cliente.pais AS Pais,
		cliente.estado AS Estado,
		cliente.municipio AS Municipio,
		cliente.codigo_postal AS 'Codigo Postal',
		cliente.delegacion AS Delegacion,
		cliente.colonia AS Colonia,
		cliente.calle AS Calle,
		cliente.num_ext AS 'Num Ext',
		cliente.num_int AS 'Num Int'
	FROM cliente;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_color
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_color`;
delimiter ;;
CREATE PROCEDURE `select_color`()
BEGIN
	SELECT color.nombre_color AS Color,
	color.`status` AS Activo
	FROM color;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_detventa
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_detventa`;
delimiter ;;
CREATE PROCEDURE `select_detventa`()
BEGIN
	SELECT detalle_venta.numero_pedido AS 'Folio Venta',
		detalle_venta.clave_producto AS 'Clave Producto',
		detalle_venta.precio_venta AS Precio,
		detalle_venta.cantidad_venta AS Cantidad,
		detalle_venta.cantidad_promocion AS Promocion,
		detalle_venta.cargo_cancelacion AS 'Cargo Cancelacion',
		detalle_venta.subtotal AS Subtotal
	FROM detalle_venta ORDER BY detalle_venta.id_dv DESC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_info_prod
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_info_prod`;
delimiter ;;
CREATE PROCEDURE `select_info_prod`(p_clave_prod VARCHAR(15))
BEGIN
	SELECT 
		producto.clave_producto AS Clave_Producto, 
		producto.nombre_producto AS Producto, 
		producto.descripcion AS Descripcion, 
		producto.image_path AS Imagen, 
		producto.precio AS Precio,
		categoria.nombre AS Categoria,
		producto.id_promocion AS Promocion_ID,
		producto.id_categoria AS Categoria_ID
	FROM
		producto
		INNER JOIN
		categoria
		ON 
			producto.id_categoria = categoria.id_categoria
	WHERE producto.clave_producto = p_clave_prod;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_material
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_material`;
delimiter ;;
CREATE PROCEDURE `select_material`()
BEGIN
	SELECT material.material AS Material,
		material.cantidad AS 'Inventario',
		material.stock_min AS 'Cantidad Minima',
		material.stock_max AS 'Cantidad Maxima',
		material.`status` AS 'Activo'
	FROM material;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_pedidos
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_pedidos`;
delimiter ;;
CREATE PROCEDURE `select_pedidos`()
BEGIN

	SELECT
		venta.numero_pedido AS Folio, 
		producto.nombre_producto AS Producto, 
		detalle_venta.cantidad_venta AS Cantidad, 
		detalle_venta.precio_venta AS Precio, 
		detalle_venta.subtotal AS Subtotal,
		CONCAT(cliente.ape1, ' ', cliente.ape2, ' ', cliente.nombre) AS Cliente,
		cliente.telefono AS Telefono, 
		cliente.estado AS Estado, 
		cliente.municipio AS Municipio, 
		cliente.delegacion AS Delegacion, 
		cliente.colonia AS Colonia,
		venta.`status` AS Estatus
	FROM
		venta
		INNER JOIN
		detalle_venta
		ON 
			venta.numero_pedido = detalle_venta.numero_pedido
		INNER JOIN
		cliente
		ON 
			venta.id_cliente = cliente.id_cliente
		INNER JOIN
		producto
		ON 
			detalle_venta.clave_producto = producto.clave_producto
		ORDER BY venta.fecha_pedido DESC
		LIMIT 10;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_producto`;
delimiter ;;
CREATE PROCEDURE `select_producto`()
BEGIN
	SELECT producto.clave_producto AS Clave_Producto,
		producto.nombre_producto AS Producto,
		producto.image_path AS Imagen,
		producto.precio AS Precio,
		tipo_promocion.descripcion_promocion AS Promocion,
		promocion.cantidad_promocion AS 'Porcentaje Promocion',
		categoria.nombre AS Categoria,
		producto.status AS Activo
	FROM producto
	INNER JOIN promocion
	ON producto.id_promocion = promocion.id_promocion
	INNER JOIN tipo_promocion
	ON promocion.id_tipo_promocion = tipo_promocion.id_tipo_promocion
	INNER JOIN categoria
	ON producto.id_categoria = categoria.id_categoria;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_producto_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_producto_cliente`;
delimiter ;;
CREATE PROCEDURE `select_producto_cliente`()
BEGIN
	SELECT producto.clave_producto AS Clave_Producto,
		producto.nombre_producto AS Producto,
		producto.image_path AS Imagen,
		producto.precio AS Precio,
		tipo_promocion.descripcion_promocion AS Promocion,
		promocion.cantidad_promocion AS 'Porcentaje Promocion',
		categoria.nombre AS Categoria,
		producto.status AS Activo
	FROM producto
	INNER JOIN promocion
	ON producto.id_promocion = promocion.id_promocion
	INNER JOIN tipo_promocion
	ON promocion.id_tipo_promocion = tipo_promocion.id_tipo_promocion
	INNER JOIN categoria
	ON producto.id_categoria = categoria.id_categoria
	WHERE producto.`status` = 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_products_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_products_categoria`;
delimiter ;;
CREATE PROCEDURE `select_products_categoria`(p_categoria VARCHAR(150))
BEGIN
	SELECT
		categoria.nombre AS Categoria, 
		producto.clave_producto AS Clave_Producto, 
		producto.nombre_producto AS Producto, 
		producto.precio AS Precio, 
		producto.image_path AS Imagen
	FROM
		producto
		INNER JOIN
		categoria
		ON 
			producto.id_categoria = categoria.id_categoria
	WHERE categoria.nombre = p_categoria
	LIMIT 3;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_promocion`;
delimiter ;;
CREATE PROCEDURE `select_promocion`()
BEGIN
	SELECT promocion.id_promocion AS ID,
		tipo_promocion.descripcion_promocion AS Promocion,
		promocion.cantidad_promocion AS Porcentaje,
		promocion.status_promocion AS Activo
	FROM promocion
	INNER JOIN tipo_promocion
	ON promocion.id_tipo_promocion = tipo_promocion.id_tipo_promocion;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_tipo_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_tipo_promocion`;
delimiter ;;
CREATE PROCEDURE `select_tipo_promocion`()
BEGIN
		SELECT tipo_promocion.descripcion_promocion AS Promocion,
			tipo_promocion.`status` AS Activo
		FROM tipo_promocion;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_usuarios
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_usuarios`;
delimiter ;;
CREATE PROCEDURE `select_usuarios`()
BEGIN
	SELECT usuario.email AS Email,
		usuario.`password`	AS 'Password',
		usuario.username AS Username
	FROM usuario;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for select_venta
-- ----------------------------
DROP PROCEDURE IF EXISTS `select_venta`;
delimiter ;;
CREATE PROCEDURE `select_venta`()
BEGIN
	SELECT venta.numero_pedido AS 'Folio Venta',
		CONCAT(cliente.ape1, ' ', cliente.ape2, ' ', cliente.nombre) AS Cliente,
		venta.fecha_pedido AS 'Fecha Pedido',
		venta.total AS Total
	FROM venta
	INNER JOIN cliente
	ON venta.id_cliente = cliente.id_cliente;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_admin
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_admin`;
delimiter ;;
CREATE PROCEDURE `update_admin`(p_id_admin TINYINT,
	p_password VARCHAR(100))
BEGIN
	UPDATE admin
	SET admin.`password` = TRIM(p_password)
	WHERE admin.id_admin = TRIM(p_id_admin);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_categoria
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_categoria`;
delimiter ;;
CREATE PROCEDURE `update_categoria`(p_id_categoria SMALLINT,
	p_nombre VARCHAR(150),
	p_descripcion VARCHAR(255))
BEGIN
	UPDATE categoria
	SET categoria.nombre = TRIM(p_nombre),
		categoria.descripcion = TRIM(p_descripcion)
	WHERE categoria.id_categoria = TRIM(p_id_categoria);
	
	SELECT 'Campos Actualizados!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_cliente`;
delimiter ;;
CREATE PROCEDURE `update_cliente`(p_id_cliente SMALLINT,
	p_nombre VARCHAR(255),
	p_ape1 VARCHAR(255),
	p_ape2 VARCHAR(255),
	p_telefono VARCHAR(10),
	p_estado VARCHAR(150),
	p_municipio VARCHAR(150),
	p_codigo_postal VARCHAR(10),
	p_delegacion VARCHAR(150),
	p_colonia VARCHAR(150),
	p_calle VARCHAR(200),
	p_num_ext VARCHAR(8),
	p_num_int VARCHAR(8))
BEGIN

	UPDATE cliente
	SET cliente.nombre = TRIM(p_nombre),
		cliente.ape1 = TRIM(p_ape1),
		cliente.ape2 = TRIM(p_ape2),
		cliente.telefono = TRIM(p_telefono),
		cliente.estado = TRIM(p_estado),
		cliente.municipio = TRIM(p_municipio),
		cliente.codigo_postal = TRIM(p_codigo_postal),
		cliente.delegacion = TRIM(p_delegacion),
		cliente.colonia = TRIM(p_colonia),
		cliente.calle = TRIM(p_calle),
		cliente.num_ext = TRIM(p_num_ext),
		cliente.num_int = TRIM(p_num_int)
	WHERE cliente.id_cliente = TRIM(p_id_cliente);
	
	SELECT 'Datos Actualizados!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_color
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_color`;
delimiter ;;
CREATE PROCEDURE `update_color`(p_id_color SMALLINT,
	p_nombre_color VARCHAR(100))
BEGIN
	UPDATE color SET color.nombre_color = TRIM(p_nombre_color)
	WHERE color.id_color = TRIM(p_id_color);
	SELECT 'Color Actualizado' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_detventa
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_detventa`;
delimiter ;;
CREATE PROCEDURE `update_detventa`(p_id_dv SMALLINT,
	p_precio FLOAT,
	p_cantidad_producto TINYINT,
	p_cantidad_promocion TINYINT,
	p_cargo_cancelacion FLOAT)
BEGIN
	DECLARE v_cargo_cancelacion FLOAT;
	DECLARE v_subtotal FLOAT;
	
	IF p_cantidad_promocion > 0 THEN
		IF p_cargo_cancelacion > 0 THEN
			SET v_subtotal = ((p_precio - (p_precio / p_cantidad_promocion)) * p_cantidad_producto) + p_cargo_cancelacion;
		ELSE
			SET v_subtotal = (p_precio - (p_precio / p_cantidad_promocion)) * p_cantidad_producto;
		END IF;
	ELSE
		IF p_cargo_cancelacion > 0 THEN
			SET v_subtotal = (p_precio * p_cantidad_producto) + p_cargo_cancelacion;
		ELSE
			SET v_subtotal = (p_precio * p_cantidad_producto);
		END IF;
	END IF;
	UPDATE detalle_venta
	SET detalle_venta.precio_venta = p_precio,
		detalle_venta.cantidad_venta = p_cantidad_producto,
		detalle_venta.cantidad_promocion = p_cantidad_promocion,
		detalle_venta.cargo_cancelacion = p_cargo_cancelacion,
		detalle_venta.subtotal = v_subtotal
	WHERE detalle_venta.id_dv = p_id_dv;
	
	SELECT 'Detall de venta Actualizado!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_material
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_material`;
delimiter ;;
CREATE PROCEDURE `update_material`(p_id_material SMALLINT,
	p_material VARCHAR(150),
	p_cantidad SMALLINT,
	p_stock_min TINYINT,
	p_stock_max SMALLINT)
BEGIN
	UPDATE material
	SET material.material = TRIM(p_material),
		material.cantidad = TRIM(p_cantidad),
		material.stock_min = TRIM(p_stock_min),
		material.stock_max = TRIM(p_stock_max)
	WHERE material.id_material = TRIM(p_id_material);
	SELECT 'Informacion Actualizada!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_producto
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_producto`;
delimiter ;;
CREATE PROCEDURE `update_producto`(p_clave_producto VARCHAR(10),
	p_nombre_producto VARCHAR(150),
	p_descripcion VARCHAR(255),
	p_image_path VARCHAR(255),
	p_precio FLOAT,
	p_id_promocion TINYINT,
	p_id_categoria SMALLINT)
BEGIN
	UPDATE producto
	SET producto.nombre_producto = TRIM(p_nombre_producto),
		producto.descripcion = TRIM(p_descripcion),
		producto.image_path = TRIM(p_image_path),
		producto.precio = TRIM(p_precio),
		producto.id_promocion = TRIM(p_id_promocion),
		producto.id_categoria = TRIM(p_id_categoria)
	WHERE producto.clave_producto = TRIM(p_clave_producto);
	
	SELECT 'Datos Actualizados!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_promocion`;
delimiter ;;
CREATE PROCEDURE `update_promocion`(p_id_promocion TINYINT,
	p_cantidad_promocion TINYINT)
BEGIN
	UPDATE promocion
	SET promocion.cantidad_promocion = TRIM(p_cantidad_promocion)
	WHERE promocion.id_promocion = TRIM(p_id_promocion);
	
	SELECT 'Promocion Actualizada!';
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_tipo_promocion
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_tipo_promocion`;
delimiter ;;
CREATE PROCEDURE `update_tipo_promocion`(p_id_tipo_promocion TINYINT,
	p_descripcion_tipo_promo VARCHAR(150))
BEGIN
		UPDATE tipo_promocion
		SET tipo_promocion.descripcion_promocion = TRIM(p_descripcion_tipo_promo)
		WHERE tipo_promocion.id_tipo_promocion = TRIM(p_id_tipo_promocion);
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_usuario
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_usuario`;
delimiter ;;
CREATE PROCEDURE `update_usuario`(p_id_usuario SMALLINT,
	p_email VARCHAR(200),
	p_password VARCHAR(100))
BEGIN
	UPDATE usuario
	SET usuario.email = TRIM(p_email),
		usuario.`password` = TRIM(p_password)
	WHERE usuario.id_usuario = TRIM(p_id_usuario);
	SELECT 'Datos Actualizados!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for update_venta
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_venta`;
delimiter ;;
CREATE PROCEDURE `update_venta`(p_numero_pedido VARCHAR(15))
BEGIN
	DECLARE v_total FLOAT;
	
	SELECT SUM(detalle_venta.subtotal) INTO v_total
	FROM detalle_venta
	WHERE detalle_venta.numero_pedido = TRIM(p_numero_pedido);

	UPDATE venta
	SET venta.total = v_total
	WHERE venta.numero_pedido = p_numero_pedido;
	
	SELECT 'Total actualizado!' AS result;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for validate_cliente
-- ----------------------------
DROP PROCEDURE IF EXISTS `validate_cliente`;
delimiter ;;
CREATE PROCEDURE `validate_cliente`(p_username VARCHAR(200))
BEGIN
	SELECT
		cliente.id_cliente AS ID
	FROM
		cliente
		INNER JOIN
		usuario
		ON 
			cliente.id_usuario = usuario.id_usuario
	WHERE usuario.username = p_username;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
