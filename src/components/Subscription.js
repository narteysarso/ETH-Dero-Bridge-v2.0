import '../App.css';

export default function Subscribe() {
  return (
<section id="hero" >
  
            <div class="hero-container">

        <h1> Subscribe <span class="font-28 weight-700 white-color mt-4"></span></h1>
      
      <h2>Register for updates!</h2>
      

      <form action="forms/notify.php" method="post" role="form" class="php-email-form">
        <div class="row no-gutters">
          <div class="col-md-6 form-group pr-md-1">
            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required></input>
          </div>
          <div class="col-md-6 form-group pl-md-1">
            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required></input>
          </div>
        </div>

        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your notification request was sent. Thank you!</div>
        </div>
        <div class="text-center"><button className="neon_btn" type="submit">Notify me!</button></div>
      </form>
</div>

   </section>

  );}
