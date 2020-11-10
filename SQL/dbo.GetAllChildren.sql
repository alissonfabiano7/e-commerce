CREATE PROCEDURE [dbo].[GetAllChildren]
	@param nvarchar(40)
AS
	WITH sub_tree AS(
  SELECT Id, Name, 1 AS relative_depth
  FROM dbo.Category
  WHERE Name = @param

  UNION ALL

  SELECT cat.Id, cat.Name, st.relative_depth + 1
  FROM dbo.Category cat, sub_tree st
  WHERE cat.ParentId = st.Id
)
SELECT * FROM sub_tree;

RETURN 0