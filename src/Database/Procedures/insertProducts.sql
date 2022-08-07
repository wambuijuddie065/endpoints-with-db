CREATE PROCEDURE 
insertProducts(
@id VARCHAR(100),
@product VARCHAR(200),
@description VARCHAR(200)
)
AS
BEGIN
INSERT INTO
Products
(id , product,description)
VALUES(@id,
@product,
@description)
END