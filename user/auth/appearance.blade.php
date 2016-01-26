@section('content')
<div class="site wrap">
	<div class="main wrap" ng-controller="signupAppearanceCtrl">
		<!-- Top users -->
		<topusers-Widget></topusers-Widget>
		<div class="user-settings appearance-settings">
			<table class="settings-step">
				<tr>
					<td ng-bind-html="tr('ui.label:signup:default')"></td>
					<td class="active" ng-bind-html="tr('ui.label:signup:about')"></td>
				</tr>
			</table>
			<div class="sign-up-about-wrap">
				<form id="appearance">
					<div class="part-wrap">
						<div class="form-group">
							<label ng-cloak for="UserHeight" class="label-dimension">{[{ tr('ui.user:settings:label:height') }]}:</label>
							<input class="inputNumWidth" type="number" name="input" ng-model="user.height" min="100" max="300">
							<label for="UserHeight" class="">см</label>
							<div class="flash-icon">+5</div>
							<div class="pull-right">
								<label ng-cloak for="UserWeight" class="label-dimension">{[{ tr('ui.user:settings:label:weight') }]}:</label>
								<input class="inputNumWidth" type="number" name="input" ng-model="user.weight" min="30" max="400">
								<label for="UserWeight">кг</label>
								<div class="flash-icon">+5</div>
							</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<label ng-cloak class="control-label">
								{[{ tr('ui.user:settings:label:body-type') }]}:
							</label>
							<div class="custom-select">
								<select
									ng-options="tr(option.key) for option in pageData.fields['ui.user:body'] track by option.id"
									ng-model="user.fields[getFieldType(pageData.fields['ui.user:body'])]">
								</select>
							</div>
							<div class="flash-icon">+5</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<label ng-cloak class=" control-label">
								{[{ tr('ui.user:settings:label:hair-color') }]}:
							</label>
							<div class="custom-select">
								<select
									ng-options="tr(option.key) for option in pageData.fields['ui.user:hair'] track by option.id"
									ng-model="user.fields[getFieldType(pageData.fields['ui.user:hair'])]">
								</select>
							</div>
							<div class="flash-icon">+5</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group">
							<label ng-cloak class=" control-label">
								{[{ tr('ui.user:settings:label:eyes-color') }]}:
							</label>
							<div class="custom-select">
								<select
									ng-options="tr(option.key) for option in pageData.fields['ui.user:eyes'] track by option.id"
									ng-model="user.fields[getFieldType(pageData.fields['ui.user:eyes'])]">
								</select>
							</div>
							<div class="flash-icon">+5</div>
						</div>
					</div>
					<div ng-if="user.gender_id == 2" class="part-wrap">
						<div class="form-group">
							<label ng-cloak class="control-label">
								{[{ tr('ui.user:settings:label:breast-size') }]}:
							</label>
							<div class="custom-select">
								<select
									ng-options="tr(option.key) for option in pageData.fields['ui.user:breast'] track by option.id"
									ng-model="user.fields[getFieldType(pageData.fields['ui.user:breast'])]">
								</select>
							</div>
							<div class="flash-icon">+5</div>
						</div>
					</div>
					<div class="part-wrap">
						<div class="form-group" data-toggle="buttons">
							<label ng-cloak class="control-label">
								{[{ tr('ui.user:settings:label:body-decorations') }]}:
							</label>
							<div class="flash-icon">+5</div>
							<tags-input ng-model="user.bodyTags" class="preferences-tags" on-tag-added="tagAdded($tag)" add-on-comma="false">
						<auto-complete source="bodyTagsLoad($query)" ></auto-complete>
						</tags-input>
					</div>
				</div>
				<button ng-click="saveAppearance()" class="btn-next-step">
				{[{ tr('ui.label:signup:about:next') }]}
				<span>
					<div class="flash-icon">+6</div>
				</span>
				</button>
			</form>
		</div>
		
		</div><!-- /.content -->
		</div><!-- /.main-->
	</div>
	@stop