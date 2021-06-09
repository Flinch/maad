import React from "react";
import "./UserProfile.css";
import Confetti from "react-confetti";
import user from "./img/kingdom-329.png";

export default class UserProfile extends React.Component {
	state = {
		user: {
			userName: "John F Dee",
			userColor: "--",
			userCakeDay: "--",
		},
		isEdit: 0,
		prevState: {},
		celebrate: 0,
	};

	onEdit = () => {
		this.setState({
			prevState: this.state.user,
			isEdit: !this.state.isEdit,
			celebrate: 0,
		});
		this.cakeDayCheck();
	};

	onInputChange = (type) => (event) => {
		const { user } = this.state;
		const newUser = {
			...user,
			[type]: event.target.value,
		};
		this.setState({ user: newUser });
	};

	onEditMode = (type) => {
		if (this.state.isEdit) {
			return (
				<form>
					<div className="form-group">
						<input
							placeholder={
								type === "userCakeDay" ? "m/d/yyyy" : ""
							}
							type="text"
							class="form-control form-control-sm"
							onChange={this.onInputChange(type)}
							value={this.state.user[type]}
						/>
					</div>
				</form>
			);
		} else {
			return this.state.user[type];
		}
	};

	onEditCancel = () => {
		this.setState({ user: this.state.prevState, isEdit: 0 });
	};

	cakeDayCheck = () => {
		if (this.state.user.userCakeDay === new Date().toLocaleDateString()) {
			this.setState({ celebrate: 1 });
		}
	};

	editOrSave = () => {
		if (this.state.isEdit) {
			return "Save Profile";
		} else {
			return "Edit Profile";
		}
	};

	render() {
		return (
			<div>
				{this.state.celebrate ? (
					<Confetti width="1400" height="1200" />
				) : (
					""
				)}
				<div className="text-center w-50 d-flex justify-content-center container">
					<div class="card-box" style={{ minWidth: "340px" }}>
						<div class="member-card pt-2 pb-2">
							<div class="thumb-sm member-thumb mx-auto">
								<img
									src={user}
									class=" img-thumbnail"
									alt="profile-image"
									style={{ maxWidth: "140px" }}
								/>
							</div>
							<div class="">
								<h4 class="mt-2">
									{this.onEditMode("userName")}
								</h4>
							</div>

							<button
								type="button"
								class="btn-sm btn-primary remove-border mt-3 btn-rounded waves-effect w-md waves-light"
								onClick={this.onEdit}
								style={{
									background: this.state.user.userColor,
								}}
							>
								{this.editOrSave()}
							</button>
							<hr />
							<div class="">
								<div class="row">
									<div class="col-6">
										<div class="mt-3">
											{this.onEditMode("userCakeDay")}
											<p class="mb-0 text-muted">
												Cake Day
											</p>
										</div>
									</div>
									<div class="col-6">
										<div class="mt-3">
											{this.onEditMode("userColor")}
											<p class="mb-0 text-muted">Color</p>
										</div>
									</div>
									{this.state.isEdit ? (
										<a
											href=""
											onClick={this.onEditCancel}
											class="small text-center"
										>
											Clear Changes
										</a>
									) : (
										""
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
