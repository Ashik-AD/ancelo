import { Card } from '../card';
import image from '../images';
import style from './greeting.module.scss';
export default function Greeting() {
  return (
    <Card className={style.greeting_card}>
      <div className={style.card__scenery}>
        <img src={image.greeting} alt="user greeting image" />
      </div>
      <div className={style.greet_message}>
        <h2 className={style.greet__user}>Good morning, John</h2>
        <p>Are you ready for the today's task :laugh'</p>
      </div>
    </Card>
  );
}
