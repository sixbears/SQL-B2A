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
const q14 = ``
const q15 = ``
const q16 = ``
const q17 = ``
const q18 = ``
const q19 = ``
const q20 = ``
const q21 = ``
const q22 = ``
const q23 = ``
const q24 = ``
const q25 = ``
const q26 = ``











































// NE PAS TOUCHER CETTE SECTION
const tp = {name: name, promo: promo, queries: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26]}
module.exports = tp
