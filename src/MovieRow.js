import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {set_note} from "./actions/index";

class MovieRow extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            showNote:false,
            note:""
        }
    }

    handleViewMore(){
        const url = "https://www.themoviedb.org/movie/" + this.props.id;
        // window.location.href = url

        var win = window.open(url, '_blank');
        win.focus();
        
    }

    handleShowNOte(){
        let movie_id = this.props.id;

        if(this.props.noteReducer.length === 0){
            this.setState({
                showNote:true
            });
        }
        else{
            this.props.noteReducer.forEach(element => {
                if(element.id === movie_id){
                    this.setState({
                        note:element.note,
                        showNote:true
                    });
                   
                }else{
                    this.setState({
                        showNote:true
                    });
                }
            });
        }

      
       
    }

    handleNoteInputArea(e){
            this.setState({
                note:e.target.value
            });
    }

    handleSaveNote(){
            let temp = {};
            temp.id = this.props.id;
            temp.note = this.state.note;
            this.props.set_note(temp);
    }

    handleClose(){
        this.setState({
            showNote:false
        })
    }

    render(){

        let poster;
        if(this.props.poster_path){
                poster = "https://image.tmdb.org/t/p/w185/"+ this.props.poster_path;
        }else{
            poster = "nopicture.gif"
        }


        return(
            <div className="container mt-4">
                 <div className="well">
                        <div className="row">
                                <div className="col-sm-2">
                                     <img alt= "poster" width="120" src={poster} />
                                </div>

                                <div className="col-sm-8">

                                    <div className="row">
                                           <h3>{this.props.title}</h3>  
                                            <p>{this.props.overview}</p>
                                    </div>

                                    <div className="row">
                                            <div className="col-sm-4">
                                                  <button onClick={this.handleViewMore.bind(this)} type="button" className="btn btn-primary mr-2">View More</button>
                                                 <button type="button" onClick={this.handleShowNOte.bind(this)} className="btn btn-success">View Note</button>
                                            </div>

                                            {this.state.showNote ? (
                                                <div className="col-sm-6">
                                                             <div className="form-group">
                                                                    <label >Note:</label>
                                                                     <textarea  className="form-control" rows="3" value={this.state.note}  onChange={this.handleNoteInputArea.bind(this)}></textarea>
                                                                     <button type="button" onClick={this.handleSaveNote.bind(this)} className="btn btn-success mt-2">Save</button>
                                                                     <button type="button" onClick={this.handleClose.bind(this)} className="btn btn-danger mt-2 ml-2">Close</button>
                                                                    
                                                             </div>
                                            </div>
                                            ) : ""}
                                            
                                        
                                    </div>

                                   
                                      
                                </div>
                        </div>

                        
                 </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        noteReducer:state.note
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({set_note:set_note}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (MovieRow);