import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    // <section className='error-page'>
    //   <div className="center">
    //     <Link to="/" className='btn primary'>Back to Home Page</Link>
    //     <h2>Page Not Found</h2>
    //   </div>
    // </section>
    <section class="page_404">
	<div class="container">
		<div class="container">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<a href="" class="link_404">Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
  )
}

export default ErrorPage