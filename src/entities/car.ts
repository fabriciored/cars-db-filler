import CarProps from "../interfaces/car.interface.ts";

export default function Car(props: CarProps) {
    (this.image = props.image),
      (this.name = props.name),
      (this.model = props.model),
      (this.year = props.year),
      (this.transmission = props.transmission),
      (this.fuel = props.fuel),
      (this.power = props.power),
      (this.torque = props.torque);
  }