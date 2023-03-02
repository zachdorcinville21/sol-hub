abstract class APIQuery {
    private _getUsernameRoute: string = 'https://solhub.app/api/get-username';
    private _updateUsernameRoute: string = 'https://solhub.app/api/update-username';
    private _updateEmailRoute: string = 'https://solhub.app/api/update-email';
    private _getConvosRoute: string = 'https://solhub.app/api/get-conversations';
    private _deleteConvoRoute: string = 'https://solhub.app/api/delete-conversation';
    private _getSolNftsRoute: string = 'https://solhub.app/api/get-sol-nfts';

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

    public get deleteConvoRoute(): string {
        return this._deleteConvoRoute;
    }

    public get getSolNftsRoute(): string {
        return this._getSolNftsRoute;
    }
}


export default APIQuery;
