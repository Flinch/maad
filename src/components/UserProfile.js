import React from "react";
import "./UserProfile.css";
import Confetti from "react-confetti";
import user from "../img/kingdom-329.png";

export default class UserProfile extends React.Component {
	state = {
		user: {
			userName: "John F Dee",
			userColor: "",
			userCakeDay: "",
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
								type === "userCakeDay" ? "m/d/yyyy" : "color..."
							}
							type={type === "userCakeDay" ? "date" : "text"}
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
		let userDate = new Date(this.state.user.userCakeDay);
		let userMonth = userDate.getMonth() + 1;
		let userDay = userDate.getDate() + 1;

		let todayDate = new Date();
		let month = todayDate.getMonth() + 1;
		let day = todayDate.getDate();

		if (month === userMonth && day === userDay) {
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
									data-testid="image"
									src={user}
									class=" img-thumbnail"
									alt="profile-image"
									style={{ maxWidth: "140px" }}
								/>
							</div>
							<div class="">
								<h4 class="mt-2" data-testid="user-name">
									{this.onEditMode("userName")}
								</h4>
							</div>

							<button
								data-testid="edit-button"
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
										<div class="mt-0">
											<p
												class="mb-0 text-muted"
												data-testid="cake-day"
											>
												Cake Day
											</p>
											{this.onEditMode("userCakeDay")}
										</div>
									</div>
									<div class="col-6">
										<div class="mt-0">
											<p
												class="mb-0 text-muted"
												data-testid="color"
											>
												Favorite Color{" "}
											</p>
											{this.onEditMode("userColor")}
										</div>
									</div>
									{this.state.isEdit ? (
										<a
											href="#"
											onClick={this.onEditCancel}
											class="small text-center mt-2"
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
