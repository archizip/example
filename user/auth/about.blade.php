@section('content')
<div class="site wrap">
	<div class="main wrap" ng-controller="signupAboutCtrl">
		
		<!-- Top users -->
		<topusers-Widget></topusers-Widget>
		<div class="user-settings">
			<table class="settings-step">
				<tr>
					<td class="active" ng-bind-html="tr('ui.label:signup:default')"></td>
					<td ng-bind-html="tr('ui.label:signup:about')"></td>
				</tr>
			</table>
			<div class="sign-up-about-wrap">
				<form name="aboutUser" class="about-form-wrap">
					<div class="part-wrap">
						<div class="form-group" ng-class="{ 'has-error' : aboutUser.nickname.$invalid && aboutUser.nickname.$touched}">
							<label class="field-name">Ваш ник:</label>
							<input type="text" name="nickname" class="form-control input-nickname" ng-model="user.nickname" ng-minlength="4" ng-maxlength="20" ng-pattern="/^[A-z][A-z0-9]*$/" record-availability-validator required />
							<div style="clear:both;"></div>
							<div ng-messages="aboutUser.nickname.$error" class="help-block">
								<div ng-message="required">
									You forgot to enter nickname
								</div>
								<div ng-message="pattern">
									Must start with a letter, and contain letters &amp; numbers only.
								</div>
								<div ng-message="required">
									You forgot to enter nickname
								</div>
								<div ng-message="minlength">
									Your nickname is too short
								</div>
								<div ng-message="maxlength">
									Your nickname is too big
								</div>
								<div ng-message="recordLoading">
									Checking database...
								</div>
								<div ng-message="recordAvailable">
									The nickname is already in use...
								</div>
							</div>
							<div style="clear:both;"></div>
						</div>
					</div>
					<div class="part-wrap date-wrap">
						<div class="form-group">
							<label for="input-birthday" class="control-label control-label-bot">
								{[{ tr('ui.label:signup:about:input-birtday') }]}
							</label><br>
							<input type="text" name="userBirthday" class="input-date" uib-datepicker-popup="dd.MM.yyyy" ng-model="user.birthday" is-open="popup1.opened" ng-required="true" close-text="Close" alt-input-formats="altInputFormats"/>
							<button type="button" class="open-popup-date" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>
							<div style="clear:both;"></div>
							<div ng-messages="aboutUser.userBirthday.$error" class="help-block">
								<div ng-message="required">
									You forgot to enter date
								</div>
							</div>
							<div style="clear:both;"></div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<div class="upload-user-avatar">
								<img id="curAvatar" ng-src="{[{user.photoMediumFirst}]}" alt="">
							</div>
							<div class="upload-avatar-wrap">
								<label ng-cloak for="inputAvatar" class="field-name">
									{[{ tr('ui.label:signup:about:input-photo') }]}:
								</label>
								<div class="flash-icon">+5</div>
								<div class="avatarupload">
									<input type="file" ngf-select ng-model="file" ngf-multiple="false" name="avatarupload">
								</div>
								<p ng-cloak class="avatar-about">
									{[{ tr('ui.user:settings:label:avatar-confidence') }]}
								</p>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group user-check">
							<label ng-cloak class="field-name">
								{[{ tr('ui.user:settings:label:gender') }]}:
							</label>
							<div class="form-group">
								<label ng-cloak
									ng-repeat="g in pageData.fields['ui.user:gender']"
									ng-class="{'active':(g.id==user.gender_id)}"
									class="btn btn-primary">
									<input
									type="radio"
									name="response"
									ng-model="user.gender_id"
									ng-checked="user.gender_id==g.id"
									data-ng-value="g.id"
									/>
									<img id="{[{g.icon}]}" ng-src="assets/ui/img/icons/{[{g.label}]}.png" alt=""/>
									{[{tr(g.name + ':' + g.label)}]}
								</label>
								<div class="flash-icon">+10</div>
							</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group" ng-class="{ 'has-error' : aboutUser.asd.$invalid && aboutUser.asd.$touched }">
							<label ng-cloak class="field-name">
								{[{ tr('ui.user:settings:label:location') }]}:
							</label>
							<div class="flash-icon">+5</div>
							<tags-input
							ng-model="location"
							class="city-set-tags"
							display-property="city"
							key-property="id"
							on-tag-added="cityAdding($tag)"
							on-tag-removed="cityDelete()"
							add-from-autocomplete-only="true"
							replace-spaces-with-dashes="false"
							name="asd"
							class="form-control"
							add-on-comma="false"
							required
							>
						<auto-complete source="cityLoad($query)" display-property="city" ></auto-complete>
						</tags-input>
						<div ng-messages="aboutUser.asd.$error" class="help-block">
							<div ng-message="required" class="help-block">
								You forgot to enter city
							</div>
						</div>
					</div>
				</div>
				<div class="part-wrap user-check ">
					<label ng-cloak class="control-label control-label-bot" >
						{[{ tr('ui.user:settings:label:preferences') }]}:
					</label>
					<div class="form-group">
						<label
							ng-repeat="pref in pageData.fields['ui.user:preferences'] track by pref.id"
							ng-class="{ active: prefId.indexOf(pref.id)+1 }"
							class="btn btn-primary set-pref">
							<input type="checkbox" checklist-model="prefId" checklist-value="pref.id" >
							<img id="{[{pref.icon}]}" ng-src="assets/ui/img/icons/{[{pref.label}]}.png" alt=""/>
						</label>
						<div class="flash-icon">+5</div>
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group">
						<label ng-cloak class="field-name">
							{[{ tr('ui.user:settings:label:relationship') }]}:
						</label>
						<div class="custom-select">
							<select
								name="relationship_id"
								ng-options="option.id as tr(option.key) for option in pageData.fields['ui.user:relationship']"
								ng-model="user.relationship_id">
							</select>
						</div>
						<div class="flash-icon">+5</div>
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group" >
						<label ng-cloak class="field-name">
							{[{ tr('ui.user:settings:label:activity') }]}:
						</label>
						<div class="custom-select">
							<select
								name="activity_id"
								ng-options="option.id as tr(option.key) for option in pageData.fields['ui.user:activity']"
								ng-model="user.activity_id">
							</select>
						</div>
						<div class="flash-icon">+5</div>
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group" >
						<label ng-cloak class="field-name">
							{[{ tr('ui.user:settings:label:sexual-tags') }]}:
						</label>
						<div class="flash-icon">+10</div>
						<tags-input ng-model="user.tags" class="preferences-tags" on-tag-added="tagAdding($tag)">
					<auto-complete source="tagsLoad($query)" ></auto-complete>
					</tags-input>
					
				</div>
			</div>
			<br>
			<button ng-click="saveAbout()" class="btn-next-step" ng-disabled="!aboutUser.$valid">
			{[{ tr('ui.label:signup:about:next') }]}
			<span>
				<div class="flash-icon">+6</div>
			</span>
			</button>
			<div ng-messages="aboutUser.asd.$error" class="help-block" ng-show="!aboutUser.$valid">
				<div ng-message="required" class="help-block">
					Please enter required fields
				</div>
			</div>
		</form>
		<div style="display:none" class="errors">
		<ul class="list-unstyled"></ul>
	</div>
</div>
</div><!-- /.content -->
</div><!-- /.main-->
</div>
@stop