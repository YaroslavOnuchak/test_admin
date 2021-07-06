import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Injectable} from "@angular/core";

export interface Cities {
  city: Cities[]
}
// export  interface
export interface HelperListStateModel {
  city: any[]
}

@State<HelperListStateModel>({
    name: "HelperList",
  defaults: {
      city: []
    }
  }
)
@Injectable()
export class HelperListState{

}
