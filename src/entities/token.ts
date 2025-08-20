import invariant from 'tiny-invariant'
import {ChainId} from '../constants'
import {validateAndParseAddress} from '../utils'
import {Currency} from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

// TODO GOLIVE
// In reality this is a map of the wrapped version of the native token for a given network.
// TODO: Rename to WNATIVE for sanity
export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417e063141139fce010982780140aa0cd5ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xaE15AcEB46f6477543F2BF641d9547FB8607a9fE', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WFTM', 'Wrapped FTM'),
  [ChainId.FANTOM_TESTNET]: new Token(
    ChainId.FANTOM_TESTNET,
    '0xf1277d1Ed8AD466beddF92ef448A132661956621',
    18,
    'FTM',
    'Wrapped FTM'
  ),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.XDAI]: new Token(ChainId.XDAI, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', 18, 'WXDAI', 'Wrapped xDai'),
  [ChainId.BSC]: new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.ARBITRUM]: new Token(
    ChainId.ARBITRUM,
    '0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.MOONBASE]: new Token(
    ChainId.MOONBASE,
    '0xe73763DB808ecCDC0E36bC8E32510ED126910394',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0xd00ae08403B9bbb9124bB305C09058E32C39A48c', 18, 'WAVAX', 'Wrapped AVAX'),
  [ChainId.HECO]: new Token(ChainId.HECO, '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', 18, 'WHT', 'Wrapped HT'),
  [ChainId.HECO_TESTNET]: new Token(
    ChainId.HECO_TESTNET,
    '0x5B2DA6F42CA09C77D577a12BeaD0446148830687',
    18,
    'WHT',
    'Wrapped HT'
  ),
  [ChainId.HARMONY]: new Token(
    ChainId.HARMONY,
    '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
    18,
    'WONE',
    'Wrapped ONE'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0x7a2afac38517d512E55C0bCe3b6805c10a04D60F',
    18,
    'WONE',
    'Wrapped ONE'
  ),
  [ChainId.SEPOLIA]: new Token(
      ChainId.SEPOLIA,
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      18,
      'WETH',
      'Wrapped Ether'
  ),
  [ChainId.PUPPYNET]: new Token(
      ChainId.PUPPYNET,
      '0x41c3F37587EBcD46C0F85eF43E38BcfE1E70Ab56',
      18,
      'WBONE',
      'Wrapped Bone'
  ),
  [ChainId.SHIBARIUM]: new Token(
      ChainId.SHIBARIUM,
      '0xC76F4c819D820369Fb2d7C1531aB3Bb18e6fE8d8',
      18,
      'WBONE',
      'Wrapped Bone'
  ),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x360ad4f9a9A8EFe9A8DCB5f461c4Cc1047E1Dcf9', 18, 'WMATIC', 'Wrapped Matic'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x06565ed324Ee9fb4DB0FF80B7eDbE4Cb007555a3', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x5300000000000000000000000000000000000004', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x19f5557E23e9914A18239990f6C70D68FDF0deD5', 18, 'WMNT', 'Wrapped Mantle'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x99604d0e2EfE7ABFb58BdE565b5330Bb46Ab3Dca', 18, 'WCELO', 'Wrapped Celo'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0xE591bf0A0CF924A0674d7792db046B23CEbF5f34', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x4200000000000000000000000000000000000023', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x18c8a7ec7897177E4529065a7E7B0878358B3BfF', 18, 'WXDAI', 'Wrapped xDai')
}

export type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token
}

export const USDC: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x72dd868Fe89113531b18f997844b77563CB665b8', 6, 'USDC', 'USD Coin'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x5067F6Dbdccd70771352e9d5E5a19DDf6A8fAfdb', 6, 'USDC', 'USD Coin'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x49A04ce101EE69b7ff76691F9EeBD134E581D4eD', 6, 'USDC', 'USD Coin'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x49A04ce101EE69b7ff76691F9EeBD134E581D4eD', 6, 'USDC', 'USD Coin'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x63E22542204dA9978218FbB3C10E1c0f6D1DC2a7', 6, 'USDC', 'USD Coin'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0xf010f12dcA0b96D2d6685bf4dB3dbB4Ad500B6Ad', 6, 'USDC', 'USD Coin'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x488327236B65C61A6c083e8d811a4E0D3d1D4268', 6, 'USDC', 'USD Coin'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x036CbD53842c5426634e7929541eC2318f3dCF7c', 6, 'USDC', 'USD Coin'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x9999f7Fea5938fD3b1C26A66fe66f4c1d4fBf0C4', 6, 'USDC', 'USD Coin'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068', 6, 'USDC', 'USD Coin'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x2C9678042D52B97D27f2bD2947F7111d93F3dD8D', 6, 'USDC', 'USD Coin'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9', 6, 'USDC', 'USD Coin'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x765DE816845861e75A25fCA122bb6898B8B1282a', 6, 'USDC', 'USD Coin'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', 6, 'USDC', 'USD Coin'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 6, 'USDC', 'USD Coin'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x44Cf74295dC0532D6aa3BbAB479C0861D867Fc3c', 6, 'USDC', 'USD Coin'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x5425890298aed601595a70AB815c96711a31Bc65', 6, 'USDC', 'USD Coin'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x64544969ed7EBf5f083679233325356EbE738930', 6, 'USDC', 'USD Coin'),
}

export const USDT: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x9E3099cA4bF0FddfAa79AC7C5dA86b0Bd8BA056C', 6, 'USDT', 'Tether USD'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x3672Aec96464C945F8274BB22Ef1de64398deB44', 6, 'USDT', 'Tether USD'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xE4B52a9781762E6a8d6cc53fD2D6be83f824971E', 6, 'USDT', 'Tether USD'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xE4B52a9781762E6a8d6cc53fD2D6be83f824971E', 6, 'USDT', 'Tether USD'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x236a6f60B554813486D84d581747217d77Af05ff', 6, 'USDT', 'Tether USD'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0xaB082b8ad96c7f47ED70ED971Ce2116469954cFB', 6, 'USDT', 'Tether USD'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x01AaE965a2C2C5E1cBb01B5FaBb4D3B7a00005a4', 6, 'USDT', 'Tether USD'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', 6, 'USDT', 'Tether USD'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832', 6, 'USDT', 'Tether USD'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0xA219439258ca9da29E9Cc4cE5596924745e12B93', 6, 'USDT', 'Tether USD'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0xf14f9596430931E504469356D5c5d6CD6fD6eD5a', 6, 'USDT', 'Tether USD'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x201EBa5CC46D216Ce6DC03F6a759e8E7660e1EF', 6, 'USDT', 'Tether USD'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1', 6, 'USDT', 'Tether USD'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0xE591bf0A0CF924A73b1f00B57Daa66eA4f0aC0E3', 6, 'USDT', 'Tether USD'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 6, 'USDT', 'Tether USD'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x4ECaBa5870353805a9F068101A40E0f32ed605C6', 6, 'USDT', 'Tether USD'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x134Dc38AE8C12D10A1823EfD6C5f3C8bF1fB8b5b', 6, 'USDT', 'Tether USD'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', 6, 'USDT', 'Tether USD'),
}

export const WBTC: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x3673628B0a9B27480c57026FCddc9Ac16d61A6EA', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xc59837d0AeBCC6AF23Dcb3c23eb757b07B0EaE0c', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xe12a4A6a6d0BFe96145D313D4d320bE664F385DF', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xe12a4A6a6d0BFe96145D313D4d320bE664F385DF', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x3a042493688489d3482e39435c2F6C8cF85a9d54', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0xE984D89fb00D0B44E798A55dc41EA598B0b0899d', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x149e3B3Bd69f1Cfc1B42b6A6a152a42E38cEeBf1', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 8, 'WBTC', 'Wrapped BTC'),
}

export const DAI: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x560EA439FA3c8ee6A4cE43a2A74320AcE26Aa97a', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xdd049E9716a7cdeeeaac3890e6721A378ABa71d8', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x102121d11a638eF1AAB9f772dE34Ea0A30cf97eb', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x102121d11a638eF1AAB9f772dE34Ea0A30cf97eb', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x12CF8bf22Be843f8c065a2474d1C439daDD238b6', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0x0726959d22361B79e4D50A5D157b044A83eC870d', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0xC2758d4E32649CCAb6e0112F4dF12Cdd9526D6C0', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x4AF5ec1E43A4c7F95430D5D4F0E4a083C29b1f8b', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'Dai Stablecoin'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b', 18, 'DAI', 'Dai Stablecoin'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A2B1a', 18, 'DAI', 'Dai Stablecoin'),
}


export const BONE: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x9813037ee2218799597d83D4a5B6F3b6778218d9', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x6d4bB7b0559Aebfc55A42cFEAAeb287c01a7f244', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.ROPSTEN]: new Token(ChainId.KOVAN, '0xD514244ED479A2050c44B448Ec681FaADd8c7429', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xD514244ED479A2050c44B448Ec681FaADd8c7429', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xD514244ED479A2050c44B448Ec681FaADd8c7429', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x0000000000000000000000000000000000001010', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0x0000000000000000000000000000000000001010', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x472e31c51Ad83C4f7bada3eaA970932426ed1D1B', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'BONE', 'BONE SHIBASWAP'),
}


export const SHIBA_INU: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x0b2367E0e56Fd9b63388F1478830c8a4b1bA5963', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xeBAdA3F2883F226BAE65fc0A6404916E965196b5', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x658f8c0456265DB1a5fC6BC0A7e8eFd6Fa7F302F', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x658f8c0456265DB1a5fC6BC0A7e8eFd6Fa7F302F', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0xAc720702Df63fa92416B3dEB24Dc4a1854f73330', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0x495eea66B0f8b636D441dC6a98d8F5C3D455C4c0', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x52c4b7527c9899b7C4Ec23128063A2dDf361e66E', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'SHIB', 'SHIBA INU'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'SHIB', 'SHIBA INU'),
}

export const LEASH: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x27C70Cd1946795B66be9d954418546998b546634', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x806b97D788D401aC2139413b5Aa42E5d408DF572', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xe74ffE1299D39231058C8B6F5AdE8BbF74eeed72', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xe74ffE1299D39231058C8B6F5AdE8BbF74eeed72', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x367a6722F2e2b09b6024A1C05deAD45e68CE385A', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0x65218A41Fb92637254B4f8c97448d3dF343A3064', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x564a1E4e36bEFfF5F6C056814f2ED65e32CA44b8', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.POLYGON_AMOY]: new Token(ChainId.POLYGON_AMOY, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.LINEA_SEPOLIA]: new Token(ChainId.LINEA_SEPOLIA, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.SCROLL_SEPOLIA]: new Token(ChainId.SCROLL_SEPOLIA, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.MANTLE_TESTNET]: new Token(ChainId.MANTLE_TESTNET, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.CELO_ALFAJORES]: new Token(ChainId.CELO_ALFAJORES, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.BLAST_SEPOLIA]: new Token(ChainId.BLAST_SEPOLIA, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.GNOSIS_CHIADO]: new Token(ChainId.GNOSIS_CHIADO, '0x582c83945e658980C85cbE6FA619777AA91F648a', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.FUJI]: new Token(ChainId.FUJI, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'LEASH', 'DOGE KILLER'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, '0x1c4a937d171752e1313D70fb16Ae2ea02f86303e', 18, 'LEASH', 'DOGE KILLER'),
}

export const UNISWAP_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'Uniswap'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'UNI', 'Uniswap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x066141B68F211E89F1bBBea09B227f380EB783c4', 18, 'UNI', 'Uniswap'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x9a2353315b13E9532c3353B910386947b4DB567D', 18, 'UNI', 'Uniswap'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x9a2353315b13E9532c3353B910386947b4DB567D', 18, 'UNI', 'Uniswap'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '0x9a2353315b13E9532c3353B910386947b4DB567D', 18, 'UNI', 'Uniswap'), // dummy data
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '0x9a2353315b13E9532c3353B910386947b4DB567D', 18, 'UNI', 'Uniswap'), // dummy
  // [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '', 18, 'UNI', 'Uniswap')
}

export const SUSHI_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', 18, 'SUSHI', 'SushiToken'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'SUSHI', 'SushiToken'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x1e3f4b46E8ab182aD1ea0544b4fFf9Ff4eD9Fa5B', 18, 'SUSHI', 'SushiToken'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x874c04a195e6696A53E7d856dAe055876fA367f6', 18, 'SUSHI', 'SushiToken'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x874c04a195e6696A53E7d856dAe055876fA367f6', 18, 'SUSHI', 'SushiToken'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'SUSHI', 'SushiToken'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'SUSHI', 'SushiToken'),
  // [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '', 18, 'SUSHI', 'SushiToken')
}

export const LINK_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x514910771AF9Ca656af840dff83E8264EcF986CA', 18, 'LINK', 'ChainLink Token'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'LINK', 'ChainLink Token'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x856333e55dae762c80208C652671EDf124210Efd', 18, 'LINK', 'ChainLink Token'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xC597CEDF0708486aC170Acb0e8Ca921008a88dDf', 18, 'LINK', 'ChainLink Token'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xC597CEDF0708486aC170Acb0e8Ca921008a88dDf', 18, 'LINK', 'ChainLink Token'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'LINK', 'ChainLink Token'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'LINK', 'ChainLink Token'),
  // [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '', 18, 'LINK', 'ChainLink Token')
}

export const XFUND_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x892A6f9dF0147e5f079b0993F486F9acA3c87881', 9, 'xFUND', 'unification.com/xfund'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 9, 'xFUND', 'unification.com/xfund'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x7fb775eAe1B6Ab3f9a65b6C718C331D3b56d6F25', 9, 'xFUND', 'unification.com/xfund'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x5Ff20Fc8F267C7df40893735776a08de20Eea72a', 9, 'xFUND', 'unification.com/xfund'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x5Ff20Fc8F267C7df40893735776a08de20Eea72a', 9, 'xFUND', 'unification.com/xfund'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 9, 'xFUND', 'unification.com/xfund'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 9, 'xFUND', 'unification.com/xfund'),
  // [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '', 9, 'xFUND', 'unification.com/xfund')
}

export const SNX_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', 18, 'SNX', 'Synthetix Network Token'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'SNX', 'Synthetix Network Token'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xb5812B65dD0c0819A3cdd1Ae98bEa3871230c1aF', 18, 'SNX', 'Synthetix Network Token'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x176f93342918A86CF53bE0BF595D68e27d2E629E', 18, 'SNX', 'Synthetix Network Token'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x176f93342918A86CF53bE0BF595D68e27d2E629E', 18, 'SNX', 'Synthetix Network Token'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

export const GRT_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xc944E90C64B2c07662A292be6244BDf05Cda44a7', 18, 'GRT', 'Graph Token'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'GRT', 'Graph Token'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x499252B5ff27c846B6c2303f333b12A32bBf5EFC', 18, 'GRT', 'Graph Token'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xE778fAE3298AF5E7dB106246593f29Ae14F18244', 18, 'GRT', 'Graph Token'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xE778fAE3298AF5E7dB106246593f29Ae14F18244', 18, 'GRT', 'Graph Token'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

export const MEME_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xD5525D397898e5502075Ea5E830d8914f6F0affe', 8, 'MEME', 'MEME'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 8, 'MEME', 'MEME'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xb50D7AfeC417922BdCD9Da7F36ed4D5FDa14a397', 8, 'MEME', 'MEME'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x349d678CED86Cc0d39B25A0cdF749F9Dde6FD655', 8, 'MEME', 'MEME'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x349d678CED86Cc0d39B25A0cdF749F9Dde6FD655', 8, 'MEME', 'MEME'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

export const ELON_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3', 18, 'ELON', 'Dogelon'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'ELON', 'Dogelon'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x60456F41B0De8764fd180d00cF40AD23D5998EF5', 18, 'ELON', 'Dogelon'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x3c188aE815f6a319BE43dc3c53A264C1BB854fe6', 18, 'ELON', 'Dogelon'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x3c188aE815f6a319BE43dc3c53A264C1BB854fe6', 18, 'ELON', 'Dogelon'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

export const DUCK_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x92E187a03B6CD19CB6AF293ba17F2745Fd2357D5', 18, 'DUCK', 'Unit protocol (DUCK)'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'DUCK', 'Unit protocol (DUCK)'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'DUCK', 'Unit protocol (DUCK)'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xDD5eC7673aC92f647B5d4D8e51205A07e76536A8', 18, 'DUCK', 'Unit protocol (DUCK)'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xDD5eC7673aC92f647B5d4D8e51205A07e76536A8', 18, 'DUCK', 'Unit protocol (DUCK)'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

export const VXV_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7D29A64504629172a429e64183D6673b9dAcbFCe', 18, 'VXV', 'VectorspaceAI'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'VXV', 'VectorspaceAI'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'VXV', 'VectorspaceAI'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'VXV', 'VectorspaceAI'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'VXV', 'VectorspaceAI'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const PERL_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xeca82185adCE47f39c684352B0439f030f860318', 18, 'PERL', 'Perlin'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'PERL', 'Perlin'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'PERL', 'Perlin'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'PERL', 'Perlin'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'PERL', 'Perlin'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const F9_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x38A94e92A19E970c144DEd0B2DD47278CA11CC1F', 9, 'F9', 'Falcon 9'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 9, 'F9', 'Falcon 9'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 9, 'F9', 'Falcon 9'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 9, 'F9', 'Falcon 9'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 9, 'F9', 'Falcon 9'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const ZIG_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7BeBd226154E865954A87650FAefA8F485d36081', 18, 'ZIG', 'ZigCoin'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'ZIG', 'ZigCoin'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'ZIG', 'ZigCoin'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'ZIG', 'ZigCoin'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'ZIG', 'ZigCoin'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const RYOSHIS_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x777E2ae845272a2F540ebf6a3D03734A5a8f618e', 18, 'RYOSHI', 'Ryoshis Vision'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xf90e84b13FaA6a50A5c361a8d35019C4236b1582', 18, 'RYOSHI', 'Ryoshis Vision'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'RYOSHI', 'Ryoshis Vision'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'RYOSHI', 'Ryoshis Vision'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x6d8413B2E48Bb2AabC3Cfc3F3D3991EC904C9fC4', 18, 'RYOSHI', 'Ryoshis Vision'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const CIV_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x37fE0f067FA808fFBDd12891C0858532CFE7361d', 18, 'CIV', 'Civilization'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x37fE0f067FA808fFBDd12891C0858532CFE7361d', 18, 'CIV', 'Civilization'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x37fE0f067FA808fFBDd12891C0858532CFE7361d', 18, 'CIV', 'Civilization'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x37fE0f067FA808fFBDd12891C0858532CFE7361d', 18, 'CIV', 'Civilization'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x37fE0f067FA808fFBDd12891C0858532CFE7361d', 18, 'CIV', 'Civilization'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const VEMP_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xcFEB09C3c5F0f78aD72166D55f9e6E9A60e96eEC', 18, 'VEMP', 'vEmpire Gamer Token'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xcFEB09C3c5F0f78aD72166D55f9e6E9A60e96eEC', 18, 'VEMP', 'vEmpire Gamer Token'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0xcFEB09C3c5F0f78aD72166D55f9e6E9A60e96eEC', 18, 'VEMP', 'vEmpire Gamer Token'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0xcFEB09C3c5F0f78aD72166D55f9e6E9A60e96eEC', 18, 'VEMP', 'vEmpire Gamer Token'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xcFEB09C3c5F0f78aD72166D55f9e6E9A60e96eEC', 18, 'VEMP', 'vEmpire Gamer Token'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}

// All test net addresses are wrong
export const UFO_TOKEN: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x249e38Ea4102D0cf8264d3701f1a0E39C4f2DC3B', 18, 'UFO', 'THE TRUTH'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x249e38Ea4102D0cf8264d3701f1a0E39C4f2DC3B', 18, 'UFO', 'THE TRUTH'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, '0x249e38Ea4102D0cf8264d3701f1a0E39C4f2DC3B', 18, 'UFO', 'THE TRUTH'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x249e38Ea4102D0cf8264d3701f1a0E39C4f2DC3B', 18, 'UFO', 'THE TRUTH'),
  [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0x249e38Ea4102D0cf8264d3701f1a0E39C4f2DC3B', 18, 'UFO', 'THE TRUTH'),
  // [ChainId.PUPPYNET]: new Token(ChainId.PUPPYNET, '', 18, 'UNI', 'Uniswap'),
  // [ChainId.SHIBARIUM]: new Token(ChainId.SHIBARIUM, '', 18, 'UNI', 'Uniswap'),
}