@section('content')

    <div class="site wrap">
        <div class="main wrap">
        
	        <!-- Top users -->
	        <topusers-Widget></topusers-Widget>

	        <div class="content">
		        <div class="container-fluid">
		            <div class="row">
		        		
		        		<h1>{{ \Lang::get('ui.label:signup:title') }}</h1>
		        		<form id="signup" action="{{ url('signup') }}">

		        			<label for="input-email">{{ \Lang::get('ui.label:signup:input-email') }}</label><br>
							<input id="input-email" type="text" name="email" value=""><span class="unique"></span><br>
		        			
		        			<label for="input-password">{{ \Lang::get('ui.label:signup:input-password') }}</label><br>
							<input id="input-password" type="password" name="password" value=""><br>

							<label for="input-password-confirm">{{ \Lang::get('ui.label:signup:input-password-confirm') }}</label><br>
							<input id="input-password-confirm" type="password" name="password_confirm" value=""><br><br>	        			
							
						    <div style="display:none" class="errors">
								<ul></ul>
							</div>

						    <a class="btn btn-lg btn-primary text-uppercase signup">
						    	{{ \Lang::get('ui.label:signup:submit') }}
					    	</a>
		        		</form>

		        		<h2>{{ \Lang::get('ui.label:signup:social') }}</h2>
						<script src="//ulogin.ru/js/ulogin.js"></script>
						<div id="uLogin_d3f88cd2" data-uloginid="d3f88cd2"></div>
		                
		            </div>
		        </div>
	        </div><!-- /.content -->

        </div><!-- /.main-->
    </div>
	<script>
		var emailAvailable = "{{ \Lang::get('ui.label:signup:email-available') }}";
		var emailNotAvailable = "{{ \Lang::get('ui.label:signup:email-not-available') }}";
	</script>
@stop

