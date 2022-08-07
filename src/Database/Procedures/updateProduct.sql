CREATE PROCEDURE updateProduct(
@id VARCHAR(100),
@product VARCHAR(200),
@description VARCHAR(200)
)
AS
BEGIN
UPDATE Products 
SET
id=@id,
product=@product,
description=@description
WHERE
id=@id
END

