@section('content')
<div class="wrap" >
	
	<!-- Sidebar -->
	@include('layouts/sidebar')
	<div class="main wrap" ng-controller="settingsPageCtrl">
		
		<!-- Top users -->
		<topusers-widget></topusers-widget>
		<div class="user-settings">
			<uib-tabset>
			<uib-tab ng-init="tabs[0].active = isActiveTab(0)" active="tabs[0].active"  select="setActiveTab(0)" heading="{[{ tr('ui.user:settings:label:main-tab') }]}">
			<form class="form-set" name="firstTab" >
				<div ng-cloak class="settings-tab-wrap">
					<div class="part-wrap date-wrap">
						<div class="form-group">
							<label for="input-birthday" class="control-label control-label-bot">
								{[{ tr('ui.label:signup:about:input-birtday') }]}
							</label><br>
							<input type="text" class="input-date" uib-datepicker-popup="dd.MM.yyyy" ng-model="user.birthday" is-open="popup1.opened" ng-required="true" close-text="Close" alt-input-formats="altInputFormats"/>
							<button type="button" class="open-popup-date" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>
						</div>
						{[{user.birthday}]}
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<div class="upload-user-avatar">
								<img id="curAvatar" ng-src="{[{user.photoMediumFirst}]}" alt="">
							</div>
							<div class="upload-avatar-wrap">
								<label for="inputAvatar "class="control-label control-label-bot">
									{[{ tr('ui.user:settings:label:avatar') }]}:
								</label>
								<div class="avatarupload">
									<input type="file" ngf-select ng-model="file" ngf-multiple="false" name="avatarupload">
								</div>
								<p class="help-block">
									{[{ tr('ui.user:settings:label:avatar-confidence') }]}
								</p>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
					<div class="clearfix"></div>
					<!-- Gender -->
					<div class="part-wrap">
						<div class="form-group user-check">
							<label class="control-label control-label-bot">
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
									ng-value="g.id"/>
									<img id="{[{g.icon}]}" ng-src="assets/ui/img/icons/{[{g.label}]}.png" alt=""/>
									{[{tr(g.name + ':' + g.label)}]}
								</label>
							</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<label class="control-label" for="inputCity">
								{[{ tr('ui.user:settings:label:location') }]}:
							</label>
							<tags-input
							ng-model="location"
							class="city-set-tags"
							display-property="city"
							key-property="id"
							on-tag-added="cityAdding($tag)"
							on-tag-removed="cityDelete()"
							add-from-autocomplete-only="true"
							replace-spaces-with-dashes="false"
							add-on-comma="false"
							>
						<auto-complete source="cityLoad($query)" display-property="city" ></auto-complete>
						</tags-input>
					</div>
				</div>
				<div class="part-wrap user-check ">
					<label class="control-label control-label-bot" >
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
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group">
						<label for="selectStatus" class=" control-label">
							{[{ tr('ui.user:settings:label:relationship') }]}:
						</label>
						<div class="custom-select">
							<select
								ng-options="option.id as tr(option.key) for option in pageData.fields['ui.user:relationship']"
								ng-model="user.relationship_id">
							</select>
						</div>
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group" >
						<label for="selectInteres" class="control-label">
							{[{ tr('ui.user:settings:label:activity') }]}:
						</label>
						<div class="custom-select">
							<select
								ng-options="option.id as tr(option.key) for option in pageData.fields['ui.user:activity']"
								ng-model="user.activity_id">
							</select>
						</div>
					</div>
				</div>
				<div class="part-wrap">
					<div class="form-group" >
						<label class="control-label" for="user-tags">
							{[{ tr('ui.user:settings:label:sexual-tags') }]}:
						</label>
						<tags-input ng-model="user.tags" class="preferences-tags" on-tag-added="tagAdding($tag)" add-on-comma="false">
					<auto-complete source="tagsLoad($query)" ></auto-complete>
					</tags-input>
				</div>
			</div>
			<button ng-click="saveInfo()" class="btn-save">
			{[{ tr('ui.user:settings:label:save') }]}
			</button>
		</div>
	</form>
	</uib-tab>
	<uib-tab ng-init="tabs[1].active = isActiveTab(1)" active="tabs[1].active"  select="setActiveTab(1)" heading="{[{ tr('ui.user:settings:label:look-tab') }]}">
	<form class="form-set" name="secondStep">
		<div ng-cloak class="settings-tab-wrap">
			<div class="part-wrap">
				<div class="form-group">
					<label for="UserHeight" class="control-label">{[{ tr('ui.user:settings:label:height') }]}:</label>
					<input class="inputNumWidth" type="number" name="input" ng-model="user.height">
					<label for="UserHeight">см</label>
					<div class="pull-right">
						<label for="UserWeight" class="control-label">{[{ tr('ui.user:settings:label:weight') }]}:</label>
						<input class="inputNumWidth" type="number" name="input" ng-model="user.weight">
						<label for="UserWeight">кг</label>
					</div>
				</div>
			</div>
			<div class="part-wrap">
				<div class="form-group">
					<label class="control-label">
						{[{ tr('ui.user:settings:label:body-type') }]}:
					</label>
					<div class="custom-select">
						<select
							ng-options="tr(option.key) for option in pageData.fields['ui.user:body'] track by option"
							ng-model="user.fields[getFieldType(pageData.fields['ui.user:body'])]">
						</select>
						
					</div>
				</div>
			</div>
			<div class="part-wrap">
				<div class="form-group">
					<label class=" control-label">
						{[{ tr('ui.user:settings:label:hair-color') }]}:
					</label>
					<div class="custom-select">
						<select
							ng-options="tr(option.key) for option in pageData.fields['ui.user:hair'] track by option"
							ng-model="user.fields[getFieldType(pageData.fields['ui.user:hair'])]">
						</select>
					</div>
				</div>
			</div>
			<div class="part-wrap">
				<div class="form-group">
					<label class=" control-label">
						{[{ tr('ui.user:settings:label:eyes-color') }]}:
					</label>
					<div class="custom-select">
						<select
							ng-options="tr(option.key) for option in pageData.fields['ui.user:eyes'] track by option"
							ng-model="user.fields[getFieldType(pageData.fields['ui.user:eyes'])]">
						</select>
					</div>
				</div>
			</div>
			<div ng-if="user.gender!=2" class="part-wrap">
				<div class="form-group">
					<label class="control-label">
						{[{ tr('ui.user:settings:label:breast-size') }]}:
					</label>
					<div class="custom-select">
						<select
							ng-options="option.key for option in pageData.fields['ui.user:breast'] track by option"
							ng-model="user.fields[getFieldType(pageData.fields['ui.user:breast'])]">
						</select>
					</div>
				</div>
			</div>
			<div class="part-wrap">
				<div class="form-group" data-toggle="buttons">
					<label class="control-label">
						{[{ tr('ui.user:settings:label:body-decorations') }]}:
					</label>
					<tags-input ng-model="user.bodyTags" class="preferences-tags" on-tag-added="tagAdded($tag)" add-on-comma="false">
				<auto-complete source="bodyTagsLoad($query)" ></auto-complete>
				</tags-input>
			</div>
		</div>
		<button ng-click="saveAppearance()"  class="btn-save">
		{[{ tr('ui.user:settings:label:save') }]}
		</button>
	</div>
</form>
</uib-tab>
<uib-tab ng-init="tabs[2].active = isActiveTab(2)" active="tabs[2].active" disable="true" select="setActiveTab(2)" heading="{[{ tr('ui.user:settings:label:confidence') }]}">
<form class="form-set" name="thirdStep">
	<div ng-cloak class="settings-tab-wrap">
		<div class="form-group" data-toggle="buttons">
			<h3>Выберите ваш пол</h3><label class="btn btn-primary active"><input autocomplete="off" checked type="checkbox"> Checkbox 1</label> <label class=
			"btn btn-primary"><input autocomplete="off" type="checkbox"> Checkbox 2</label> <label class="btn btn-primary"><input autocomplete="off" type="checkbox"> Checkbox
			3</label> <label class="btn btn-primary"><input autocomplete="off" type="checkbox"> Checkbox 4</label>
		</div>
		<div class="form-group">
			<label class="control-label" for="inputNickname">Введите ваш город</label>
			<input class="form-control" id="inputNickname" type="text">
		</div>
		<div class="form-group" data-toggle="buttons">
			<label class="btn btn-primary active"><input autocomplete="off" checked type="checkbox"> Checkbox 1</label> <label class="btn btn-primary"><input autocomplete="off" type=
			"checkbox"> Checkbox 2</label> <label class="btn btn-primary"><input autocomplete="off" type="checkbox"> Checkbox 3</label> <label class=
			"btn btn-primary"><input autocomplete="off" type="checkbox"> Checkbox 4</label>
		</div>
		<div class="form-group">
			<select class="form-control">
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>
		</div>
		<div class="form-group">
			<select class="form-control">
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>
		</div>
		<button class="btn btn-default pull-right" type="submit">Submit</button>
	</div>
</form>
</uib-tab>
</uib-tabset>
<addtopmessage-Widget></addtopmessage-Widget>
</div>
</div><!-- /.main-->
</div> <!-- /.wrapper-->
@stop