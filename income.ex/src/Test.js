class EditProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {id:'',  name: '', description: '', price: '', category_id: '', qty: '', waranty : '' , imagePreviewUrl : '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch('https://www.api.senpru.com/signalinfo/index.php/product/product?id=' + this.props.match.params.id)
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					id: result.id,
					name: result.name,
					description: result.description,
					price: result.price,
					category_id:result.category_id,
					qty: result.qty,
					waranty: result.waranty,
					imagePreviewUrl: 'http://www.senpru.com/api/signalinfo/' +result.img,

				});
			});
	}
	handleChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	handleSubmit(event) {
		event.preventDefault();
		fetch('https://www.api.senpru.com/signalinfo/index.php/product/update_product', {
			method: 'PUT',
			body: JSON.stringify({
				id: this.state.id,
				name: this.state.name,
				description: this.state.description,
				price: this.state.price,
				qty: this.state.qty,
				category_id:this.state.category_id,
				waranty: this.state.waranty,
			    img: (JSON.stringify(this.state.imagePreviewUrl))
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			if (response.status === 200) {
				alert("อัพเดตแล้ว");
				this.props.history.push("/All");
			}
		});
	}
	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
		console.log('handle uploading-', this.state.file);
	  }
	  _handleImageChange(e) {
		e.preventDefault();
	
		let reader = new FileReader();
		let file = e.target.files[0];
	
		reader.onloadend = () => {
		  this.setState({
			file: file,
			imagePreviewUrl: reader.result });
			console.log(this.state.imagePreviewUrl);
		};
	
		reader.readAsDataURL(file);
	  }

	render() {
		let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img width="120px" src={imagePreviewUrl}  />);
    } else {
      $imagePreview = (<div className="previewText"> <li color="red">
    รูปสินค้า
    </li></div>);
    }
		const status = localStorage.getItem('status');
		return (
			<div className="container">
					
				<Link to="/all">  <button type="button" class="btn btn-warning">
                                    ย้อนกลับ
                                  </button></Link>
				<p />
				<form onSubmit={this.handleSubmit}>

					<div className="row">
						<div className="col-6">
							<p>
								<label>ชื่อ</label>
								<input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
							</p>
						</div>
						<div className="col-6">
							<p>
								<label>รายละเอียดสินค้า</label>
								<input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>
								<label>ราคา</label>
								<input className="form-control" type="int" name="price" value={this.state.price} onChange={this.handleChange} />
							</p>
						</div>
						<div className="col-6">
							<p>
								<label>จำนวน</label>
								<input className="form-control" type="int" name="qty" value={this.state.qty} onChange={this.handleChange} />
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6">
							<p>
								<label>รับประกัน</label>
								<input className="form-control" type="int" name="waranty" value={this.state.waranty} onChange={this.handleChange} />
							</p>
						</div>
						<div className="col-6">
						<label>หมดหมู่</label>
						<select className="form-control" id="status" name="category_id" value={this.state.category_id} onChange={this.handleChange}>							
							<option value={3}>SSD</option>
							<option value={1}>RAM</option>
							<option value={2}>HHD</option>
							<option value={5}>M.2</option>
					
						</select>
						</div>
						<div className="checkout-cart2">
                    <div className="previewComponent">
                      <center>    <img src="/static/media/UploadIcon.1cedb6e9.svg" class="uploadIcon" alt="Upload Icon"/>
                      <div className="custom-file">
          <input className="custom-file-input"
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} /></div></center>
                
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
      </div>
					</div>
					
					<p>
					<Button type="submit" value="Submit"  variant="contained" color="primary">
      Update
    </Button>
					</p>
				</form>
	
			</div>
		);
	}
}

export default EditProduct;