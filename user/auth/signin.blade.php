@section('content')
<div class="site wrap">
	<div class="main wrap" ng-controller="signInCtrl">
		<!-- Top users -->
		<topusers-Widget></topusers-Widget>
		<div class="content">
			<div ng-cloak class="auth-form-wrap">
				<div class="auth-left-part">
					<div class="log-in-form " ng-class="changeForm">
						<div class="auth-title">{[{tr('ui.label:signin:label')}]} в <a href="/" class="text-uppercase">ta<span>s</span><span>s</span>i</a></div>
						<hr>
						<form name="userSignIn">
							<div class="form-group" ng-class="{ 'has-error' : userSignIn.signEmail.$invalid && userSignIn.signEmail.$touched }">
								<label>Ваш {[{tr('ui.label:signin:input-email')}]}:</label>
								<input type="email" name="signEmail" class="form-control" ng-model="email" required>
								<div style="clear:both;"></div>
								<div ng-show="userSignIn.signEmail.$invalid && !userSignIn.signEmail.$pristine" class="help-block">Enter a valid email.</div>
								<div style="clear:both;"></div>
							</div>
							<div class="form-group" ng-class="{ 'has-error' : userSignIn.password.$invalid && userSignIn.password.$touched }">
								<label for="input-password">Ваш {[{tr('ui.label:signin:input-password')}]}:</label>
								<input id="input-password" type="password" name="password" ng-model="pass" ng-enter="signIn(email,pass)">
								<div style="clear:both;"></div>
								<div ng-show="userSignIn.$error.check" class="help-block">Incorrect email or password</div>
								<div style="clear:both;"></div>
							</div>
							<a class="btn btn-lg btn-primary text-uppercase show " ng-click="signIn(email,pass)">{[{tr('ui.label:signin:submit')}]}</a>
						</form>
						<div class="retrieval-register-wrap">
							<span><a href="">Забыли пароль?</a></span>
							<span><a href="" ng-click="changeForm='active-registration'">Регистрация > </a></span>
						</div>
					</div>
					<div class="registration-form">
						<div class="auth-title">Регистрация в <a href="/" class="text-uppercase">ta<span>s</span><span>s</span>i</a></div>
						<hr>
						<form name="userReg">
							<div class="form-group" ng-class="{ 'has-error' : userReg.email.$invalid && userReg.email.$touched}">
								<label>Ваш {[{tr('ui.label:signin:input-email')}]}:</label>
								<input type="email" name="email" class="form-control" ng-model="regEmail" record-availability-validator required>
								<div style="clear:both;"></div>
								<div ng-messages="userReg.email.$error" class="help-block" ng-show="userReg.email.$touched">
									<div ng-message="required">
										You forgot to enter email
									</div>
									
									<div ng-message="email">
										Incorrect email
									</div>
									<div ng-message="recordLoading">
										Checking database...
									</div>
									<div ng-message="recordAvailable">
										The email is already in use...
									</div>
								</div>
								<div style="clear:both;"></div>
							</div>
							<div class="form-group" ng-class="{ 'has-error' : userReg.regPassword.$invalid && userReg.regPassword.$touched}">
								<label>Ваш {[{tr('ui.label:signin:input-password')}]}:</label>
								<input type="password" name="regPassword" class="form-control" ng-model="regPassword" ng-minlength="5" required>
								<div style="clear:both;"></div>
								<input type="password" name="confPassword" class="form-control" ng-model="regPassConf" required>
								<div style="clear:both;"></div>
								<div ng-messages="userReg.regPassword.$error" class="help-block" ng-show="userReg.regPassword.$touched">
									<div ng-message="required">
										You forgot to enter password
									</div>
									<div ng-message="minlength">
										Your password is too short
									</div>
								</div>
								<div style="clear:both;"></div>
							</div>

							<a class="btn btn-lg btn-primary text-uppercase show" ng-click="signUp(regEmail,regPassword,regPassConf)" ng-disabled="!userReg.$valid">Регистрация</a>
						</form>
						<div class="retrieval-register-wrap">
							<span><a href="" ng-click="changeForm='active-sign-in'"> < Вход</a></span>
						</div>
					</div>
				</div>
				<div class="auth-right-part">
					<div class="auth-title">
						Войти через социальные сети:
					</div>
					<ul class="list-unstyled">
						<li class="vk-social"><a href=""><span>B</span>Вконтакте</a></li>
						<li class="fb-social"><a href=""><span>f</span>Facebook</a></li>
						<li class="od-social"><a href=""><span><img src="/assets/ui/img/icons/od-icon.png" alt=""></span>Однокласники</a></li>
					</ul>
				</div>
			</div>
		</div>
		</div><!-- /.content -->
		</div><!-- /.main-->
	</div>
	@stop