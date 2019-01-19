import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AchievementList from './Components/AchievementList/AchievementList';
import Profile from './Components/Profile/Profile';
import Categories from './Components/Categories/Categories';
import completeAchievementList from './completeAchievementList';

class App extends Component {
  constructor(){
    super();

    this.state = {
      achievements: completeAchievementList,
      username: 'MagicTricksKill',
      level: 1,
      experience: 20,
      completedAchievements: 0,
      experienceCap: 100
    }

    this.categorize = this.categorize.bind(this);
    this.gainExperience = this.gainExperience.bind(this);
    this.levelUp = this.levelUp.bind(this);
  }

categorize(category){
    const categorizedAchievements = [];
    console.log(category);

    if(category !== 'All'){
    completeAchievementList.map(achievement =>{
      if(achievement.category === category){
        categorizedAchievements.push(achievement);
        this.setState({achievements: categorizedAchievements})
      }
    })
  }else{
    this.setState({achievements: completeAchievementList})
  }
}

levelUp(){
  this.setState({level: this.state.level + 1, experience: 0, experienceCap: this.state.experienceCap * 1.5});

}

gainExperience(experience, id){
  const newExperienceTotal = this.state.experience + experience;
      console.log(newExperienceTotal);
  this.setState({experience: newExperienceTotal});
  if(newExperienceTotal >= (this.state.experienceCap)){
    this.levelUp();
  }
}

  render() {
    return (
      <div className="App">
      <Profile username={this.state.username} level={this.state.level} experience={this.state.experience} completedAchievements={this.state.completedAchievements}/>
        <div className="App-Body">
          <Categories categorize={this.categorize}/>
          <AchievementList availableAchievements={this.state.achievements} experienceHandler={this.gainExperience}/>
        </div>
      </div>
    );
  }
}

export default App;
