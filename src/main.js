
const isUrlValid = (string) => {
   try {
     new URL(string);
     return true;
   } catch (err) {
     return false;
   }
  }

const onClickBtm = async () => {
   const urlText = document.getElementById('inputUrl').value;


   const isUrlCorrect = isUrlValid(urlText);
   if(!isUrlCorrect){
      document.getElementById('error').classList.add('show');
   }else{
      document.getElementById('error').classList.remove('show');

      const response = await fetch('/create', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({url: urlText}),
         cache: 'no-store',
      });

      if(response?.ok){
         const data = await response.json();
         document.getElementById('view').innerHTML = `Your short url is: <a target='_blank' href='/s/${data?.shortUrl}'>/s/${data?.shortUrl}</a>`;
      }else{
         console.log('error fetching result')
      }
   }
}