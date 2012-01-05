function CreateAjaxCall(url, callback, httpMethod, isAsync) 
{
	xmlhttp = new XMLHttpRequest()    
	xmlhttp.onreadystatechange = callback
	xmlhttp.open(httpMethod, url, isAsync)
	xmlhttp.send()
}

function GetUrlFourSquare() 
{	
	var url = "https://api.foursquare.com/v2/venues/explore"
	var latitude = document.getElementById('latitude').value
	var longitude = document.getElementById('longitude').value
	var clientId = "client_id=RAW0EPX43NJKJUOSZ4CH3XM1PJ0TMMM33FGRUHQJS2PJTXNS"
	var clientSecret = "client_secret=WNFXNE2VRCMSL3NZJAWB0GRQA32I2UT2GDNMOMCPQRLKJOWS"
	
	return url + "?ll=" + latitude + "," + longitude + "&" + clientId + "&" + clientSecret
}

function SearchPlace() 
{	
	var callback = function() 
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
		{
			var jsonData = eval('(' + xmlhttp.responseText + ')')
			var estabelecimentos = jsonData.response.groups[0].items	
			PrintData(estabelecimentos)
		}
	}
	CreateAjaxCall(GetUrlFourSquare(), callback, "GET", true)
}

function PrintData(estabelecimentos)
{
	document.getElementById("estabelecimentos").innerHTML = 
		"<p class=status>Foram encontrados " + estabelecimentos.length + " estabelecimentos!</p>"
	
	for (var i = 0; i < estabelecimentos.length; i++) 
	{		
		var result = "<table> " +
					 "	<tr>" +
					 "		<td class=info>Nome:</td>"+
					 "		<td>"+estabelecimentos[i].venue.name+"</td>"+
					 "	</tr>" +					 
					 "	<tr>" +
					 "		<td class=info>Endereco:</td>"+
					 "		<td>"+estabelecimentos[i].venue.location.address+"</td>"+
					 "	</tr>" +					 
					 "	<tr>" +
					 "		<td class=info>Telefone:</td>"+
					 "		<td>"+estabelecimentos[i].venue.contact.phone+"</td>"+
					 "	</tr>" +					 					 					 
					 "	<tr>" +
					 "		<td class=info>Distancia:</td>"+
					 "		<td>"+estabelecimentos[i].venue.location.distance+" metros</td>"+
					 "	</tr>" 
					 
		for (var j = 0; j < estabelecimentos[i].tips.length; j++) 
		{						
			result +=
					 " <tr>" +					 
					 "		<td class=info>Comentário:</td>"+
					 " </tr>" +
					 " <tr>" +
					 "		<td><img src='" + estabelecimentos[i].tips[j].user.photo + "' width='50' height='50'/></td>"+ 
					 "		<td>"+estabelecimentos[i].tips[j].user.firstName+" disse:</td>"+
					 "		<td class=post>"+ estabelecimentos[i].tips[j].text+"</td>"+
					 "	</tr>"				 
		}
		
		result += "</table>"
		
		document.getElementById("estabelecimentos").innerHTML += result	
	}
	
}