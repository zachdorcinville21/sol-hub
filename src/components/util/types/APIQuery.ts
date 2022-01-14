abstract class APIQuery {
    private _getUsernameRoute: string = 'http://localhost:5000/get-username';
    private _updateUsernameRoute: string = 'http://localhost:5000/update-username';
    private _updateEmailRoute: string = 'http://localhost:5000/update-email';
    private _getConvosRoute: string = 'http://localhost:5000/get-conversations';

    public get getUsernameRoute(): string {
        return this._getUsernameRoute;
    }

    public get updateUsernameRoute(): string {
        return this._updateUsernameRoute;
    }

    public get updateEmailRoute(): string {
        return this._updateEmailRoute;
    }

    public get getConvosRoute(): string {
        return this._getConvosRoute;
    }
}


export default APIQuery;

