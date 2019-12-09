const name = "Hugo Six"
const promo = "B2A"

const q1 = `
Select * 
From Track
Where Milliseconds < (Select Milliseconds From Track Where TrackId = 3457)`

const q2 = `
Select * 
From Track
Where MediaTypeId = (Select MediaTypeId From Track Where Name = 'Rehab')`

const q3 = `
Select p.playlistId, p.name, COUNT(t.trackId) as 'Nb tracks', 
SUM(t.Milliseconds) as 'total time', AVG(t.milliseconds) as 'avg time'
from Playlist p 
join PlaylistTrack pt on p.PlaylistId = pt.PlaylistId
join Track t on pt.trackid = t.TrackId
Group by p.PlaylistId , p.Name`

const q4 = `
select pp.PlaylistId, pp.Name, sum(tt.Milliseconds) as time_playlist
from Playlist pp
join PlaylistTrack ptpt on pp.PlaylistId = ptpt.PlaylistId
join Track tt on ptpt.TrackId = tt.TrackId
where (select sum(tt2.Milliseconds) as time_playlist
		from Playlist pp2
		join PlaylistTrack ptpt2 on pp2.PlaylistId = ptpt2.PlaylistId
		join Track tt2 on ptpt2.TrackId = tt2.TrackId
		where pp.PlaylistId = pp2.playlistid) >= (Select AVG((d.total_time_playlist) / (nb.nb_track_playlist)) as AVG_time_playlist
									from Playlist p1
									join (Select p2.PlaylistId, sum(t1.milliseconds) as total_time_playlist
										from Playlist p2
										join PlaylistTrack pt1 on p2.PlaylistId = pt1.PlaylistId
										join Track t1 on pt1.trackid = t1.TrackId
										Group by p2.PlaylistId) d on p1.PlaylistId = d.playlistid
									join (select pt2.playlistid, count(t2.trackid) as nb_track_playlist
										from track t2 join PlaylistTrack pt2 on pt2.TrackId = t2.TrackId
										group by pt2.playlistid) nb on p1.PlaylistId = nb.playlistid)
group by pp.PlaylistId, pp.Name`

const q5 = `SELECT p.Name, p.PlaylistId,  COUNT(t.trackId) as 'Nb tracks'
FROM Playlist p
JOIN PlaylistTrack pt
ON p.PlaylistId = pt.PlaylistId
JOIN Track t
ON pt.TrackId = t.TrackId
Where p.PlaylistId not in (1,13)
GROUP BY p.PlaylistId, p.Name
HAVING COUNT(t.TrackId) = (
    SELECT COUNT(t.TrackId)
    FROM Playlist p
    JOIN PlaylistTrack pt
    ON p.PlaylistId = pt.PlaylistId
    JOIN Track t
    ON pt.TrackId = t.TrackId
    WHERE p.PlaylistId = 1
) OR COUNT(t.TrackId) = (
    SELECT COUNT(t.TrackId)
    FROM Playlist p
    JOIN PlaylistTrack pt
    ON p.PlaylistId = pt.PlaylistId
    JOIN Track t
    ON pt.TrackId = t.TrackId
    WHERE p.PlaylistId = 13
) `

const q6 = `
Select Distinct c.customerid, c.FirstName, c.LastName
from invoice i
join Customer c on c.CustomerId = i.CustomerId
where i.Total > (Select max(Total)
					from Invoice
          where BillingCountry like 'France')`
          
const q7 = ``
const q8 = `
Select t.TrackId, t.Name, t.Composer, t.Milliseconds, t.Bytes, t.UnitPrice, m.MediaTypeId, m.Name as Name_media,
(select AVG(UnitPrice) from Track) as prix_moyen_global, AVG(UnitPrice) as prix_moyen_media
from track t
join mediatype m on m.MediaTypeId = t.MediaTypeId
where unitprice > (select AVG(UnitPrice) from Track)
Group by  t.TrackId, t.Name, t.Composer, t.Milliseconds, t.Bytes, t.UnitPrice, m.MediaTypeId, m.Name`

const q9 = ``
const q10 = `
Select p.playlistid, p.name, COUNT(ar.ArtistId) Nb_Artist,
COUNT(t.TrackId) / COUNT(ar.artistId) 'Nb_Musique/Artiste',
AVG(i.unitprice) 'prix_moyen', MAX(ar.Name),  COUNT(ar.ArtistId) Max_Artist
from playlist p
join PlaylistTrack pt on pt.PlaylistId = p.PlaylistId
join Track t on t.TrackId = pt.TrackId
join InvoiceLine i on t.TrackId = i.TrackId
join Album a on a.AlbumId = t.AlbumId
join Artist ar on a.ArtistId = ar.ArtistId
group by p.PlaylistId, p.Name`

const q11 = `
select c.Country, COUNT(c.country)+ COUNT(i.billingcountry)+COUNT(e.country) 'Nb ref pays'
from Employee e
join Customer c on c.SupportRepId = e.EmployeeId 
join Invoice i on i.CustomerId = c.CustomerId
group by c.Country`

const q12 = `
select c.Country, COUNT(c.country)+ COUNT(i.billingcountry)+COUNT(e.country) 'Total',
COUNT(e.country) Employee, COUNT(c.country) Customer, COUNT(i.billingcountry) Invoice
from Employee e
join Customer c on c.SupportRepId = e.EmployeeId 
join Invoice i on i.CustomerId = c.CustomerId
group by c.Country`

const q13 = ``
const q14 = `
Select il.invoicelineid, il.invoiceid, il.trackid, il.unitprice, il.quantity, AVG(il.unitprice) 'prix moyen',
t.Milliseconds, il.UnitPrice/t.Milliseconds*1000 'prix/sec'
from InvoiceLine il
join Track t on t.TrackId = il.TrackId
group by il.invoicelineid, il.invoiceid, il.trackid, il.unitprice, il.quantity, t.Milliseconds`

const q15 = ``
const q16 = `
SELECT TOP 1 Employee.LastName, Employee.FirstName
FROM Employee
INNER JOIN Customer ON Employee.EmployeeId = Customer.SupportRepId
INNER JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
GROUP BY Employee.FirstName, Employee.LastName
ORDER BY SUM(Invoice.Total)
`
const q17 = ``
const q18 = `
DROP DATABASE IF EXISTS [part2];
GO
CREATE DATABASE [part2];
GO
USE [part2];
GO

CREATE TABLE [dbo].[Group]
(
  [id] INT NOT NULL IDENTITY,
  [name] NVARCHAR(40) NOT NULL,
  [display_name] NVARCHAR(40) NOT NULL,
  [description] NVARCHAR(255),
  CONSTRAINT [PK_Group] PRIMARY KEY CLUSTERED ([id])

);
GO
CREATE TABLE [dbo].[User]
(
  [id] INT NOT NULL IDENTITY,
  [username] NVARCHAR(40) NOT NULL,
  [email] NVARCHAR(50) NOT NULL,
  [superuser] BIT NOT NULL,
  CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([id])
);
GO
CREATE TABLE [dbo].[Role]
(
  [id] INT NOT NULL IDENTITY,
  [name] NVARCHAR(40) NOT NULL,
  [display_name] NVARCHAR(40) NOT NULL,
  [description] NVARCHAR(255),
  CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ([id])
);
GO
CREATE TABLE [dbo].[Permission]
(
  [id] INT NOT NULL IDENTITY,
  [name] NVARCHAR(40) NOT NULL,
  [display_name] NVARCHAR(40) NOT NULL,
  [description] NVARCHAR(255),
  CONSTRAINT [PK_Permission] PRIMARY KEY CLUSTERED ([id])
);
GO
CREATE TABLE [dbo].[User_Group]
(
  [user_id] INT NOT NULL,
  [group_id] INT NOT NULL
);
GO
CREATE TABLE [dbo].[Group_Role]
(
  [group_id] INT NOT NULL,
  [role_id] INT NOT NULL
);
GO
CREATE TABLE [dbo].[User_Role]
(
  [user_id] INT NOT NULL,
  [role_id] INT NOT NULL
);
GO
CREATE TABLE [dbo].[Role_Permission]
(
  [role_id] INT NOT NULL,
  [permission_id] INT NOT NULL
);
GO

ALTER TABLE [dbo].[User_Group] ADD CONSTRAINT [FK_User_Group_user_id]
    FOREIGN KEY ([user_id]) REFERENCES [dbo].[User] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[User_Group] ADD CONSTRAINT [FK_User_Group_group_id]
    FOREIGN KEY ([group_id]) REFERENCES [dbo].[Group] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[Group_Role] ADD CONSTRAINT [FK_Group_Role_group_id]
    FOREIGN KEY ([group_id]) REFERENCES [dbo].[Group] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[Group_Role] ADD CONSTRAINT [FK_Group_Role_user_id]
    FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[Role_Permission] ADD CONSTRAINT [FK_Role_Permission_user_id]
    FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[Role_Permission] ADD CONSTRAINT [FK_Role_Permission_group_id]
    FOREIGN KEY ([permission_id]) REFERENCES [dbo].[Permission] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[User_Role] ADD CONSTRAINT [FK_User_Role_group_id]
    FOREIGN KEY ([user_id]) REFERENCES [dbo].[User] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
ALTER TABLE [dbo].[User_Role] ADD CONSTRAINT [FK_User_Role_user_id]
    FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role] ([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
GO
`

const q19 = `
INSERT INTO Track 
  (Name, 
  AlbumId, 
  MediaTypeId, 
  GenreId, 
  Composer, 
  Milliseconds, 
  Bytes, 
  UnitPrice) 
VALUES 
  ('New1', 10, 1, 1, 'Test', 33800, 2048, 0.99), 
  ('New2', 10, 1, 1, 'Test', 33800, 2048, 0.99), 
  ('New3', 10, 1, 1, 'Test', 33800, 2048, 0.99);
`

const q20 = `
INSERT INTO Employee 
  (LastName, 
  FirstName, 
  Title, 
  ReportsTo,
  BirthDate, 
  HireDate, 
  Address, 
  City, 
  State, 
  Country, 
  PostalCode, 
  Phone, 
  Fax, 
  Email) 
VALUES 
  ('Six', 'Hugo', 'Patron', 1, 1995-05-04, 2018-09-08, '89 Quais des Chartrons', 'Bordeaux', 'FR', 'France', '33800', '0600000000', '0000000000', 'hugo.six@ynov.com'), 
  ('Test', 'EncoreTest', 'Stagiaire', 1, 1420-12-30, 2018-09-08, '89 Quais des Chartrons', 'Bordeaux', 'FR', 'France', '33800', '0600000001', '0000000001', 'test@ynov.com')

`

const q21 = `
DELETE FROM InvoiceLine
WHERE InvoiceId IN (
  SELECT InvoiceId 
  FROM Invoice 
  WHERE YEAR(InvoiceDate) = 2010
)
DELETE FROM Invoice
WHERE YEAR(InvoiceDate) = 2010
`

const q22 = `
UPDATE Invoice
SET CustomerId = (
  SELECT TOP 1 Customer.CustomerId
  FROM Customer
  JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
  WHERE Customer.Country = 'France'
  GROUP BY Customer.CustomerId
  ORDER BY COUNT(Invoice.InvoiceId) DESC
)
WHERE YEAR(InvoiceDate) >= 2011 
  AND YEAR(InvoiceDate) <= 2014
  AND BillingCountry = 'Germany'
`

const q23 = `
UPDATE Invoice
SET Invoice.BillingCountry = Customer.Country
FROM Invoice
JOIN Customer ON Invoice.CustomerId = Customer.CustomerId
WHERE Invoice.BillingCountry <> Customer.Country
`

const q24 = `
ALTER TABLE Employee 
ADD Salary int
`

const q25 = `
UPDATE Employee 
SET Salary = ROUND(RAND(CHECKSUM(NEWID()))*(100000-30000), 0) + 30000
`

const q26 = `
ALTER TABLE Invoice
DROP COLUMN BillingPostalCode
`











































// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp
